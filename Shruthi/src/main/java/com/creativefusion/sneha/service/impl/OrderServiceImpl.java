package com.creativefusion.sneha.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.creativefusion.sneha.dto.info.MenuInfo;
import com.creativefusion.sneha.dto.request.OrderRequest;
import com.creativefusion.sneha.dto.response.CountResponse;
import com.creativefusion.sneha.dto.response.OrderResponse;
import com.creativefusion.sneha.model.Order;
import com.creativefusion.sneha.model.OrderMapping;
import com.creativefusion.sneha.model.Menu;
import com.creativefusion.sneha.model.User;
import com.creativefusion.sneha.repository.OrderRepository;
import com.creativefusion.sneha.repository.MenuRepository;
import com.creativefusion.sneha.repository.UserRepository;
import com.creativefusion.sneha.service.OrderService;
import com.creativefusion.sneha.service.MenuService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final MenuRepository menuRepository;
    private final OrderRepository orderRepository;
    private final MenuService menuService;

    @Override
    public boolean saveOrder(OrderRequest request) {
        User user = userRepository.findByUid(request.getUid());
        List<MenuInfo> menuInfoList = request.getMenus();
        long orderTotal = calculateOrderTotal(menuInfoList);

        if (orderTotal <= 0) {
            throw new IllegalArgumentException("Order total must be greater than zero.");
        }

        try {
            Order order = createOrder(request, user, orderTotal, menuInfoList);
            orderRepository.save(order);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private Order createOrder(OrderRequest request, User user, long orderTotal, List<MenuInfo> menuInfoList) {
        Order order = Order.builder()
                .orderDate(new Date())
                .orderAddress(request.getOrderAddress())
                .paymentMode(request.getPaymentMode())
                .user(user)
                .orderTotal(orderTotal)
                .orderMappings(request.getMenus().stream()
                        .map(menuRequest -> {
                            Menu menu = menuService.getMenuModelId(menuRequest.getFid());
                            if (menu != null) {
                                return OrderMapping.builder().menu(menu).build();
                            } else {
                                throw new IllegalArgumentException("Invalid menu ID: " + menuRequest.getFid());
                            }
                        })
                        .collect(Collectors.toList()))
                .build();

        updateMenuQuantities(menuInfoList);

        return order;
    }

    private List<Menu> updateMenuQuantities(List<MenuInfo> menuInfoList) {
        List<Menu> updatedMenus = new ArrayList<>();

        for (MenuInfo menuInfo : menuInfoList) {
            Long productId = menuInfo.getFid();
            Long quantity = menuInfo.getQuantity();

            Menu menu = getMenuOrThrow(productId);

            if (menu.getFoodQuantity() < quantity) {
                throw new IllegalArgumentException("Insufficient quantity for menu ID: " + productId);
            }

            Menu updatedMenu = createUpdatedMenu(menu, quantity);
            menuRepository.save(updatedMenu);
            updatedMenus.add(updatedMenu);
        }

        return updatedMenus;
    }

    private Menu getMenuOrThrow(Long productId) {
        return menuRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found for ID: " + productId));
    }

    private Menu createUpdatedMenu(Menu menu, Long quantity) {
        Menu updatedMenu = new Menu();
        updatedMenu.setMid(menu.getMid());
        updatedMenu.setFoodName(menu.getFoodName());
        updatedMenu.setFoodPrice(menu.getFoodPrice());
        updatedMenu.setFoodQuantity(menu.getFoodQuantity() - quantity);
        updatedMenu.setFoodImage(menu.getFoodImage());
        updatedMenu.setFoodDesc(menu.getFoodDesc());
        return updatedMenu;
    }

    private long calculateOrderTotal(List<MenuInfo> menuInfoList) {
        return menuInfoList.stream()
                .mapToLong(menuInfo -> {
                    Menu menu = getMenuOrThrow(menuInfo.getFid());
                    if (menu.getFoodQuantity() < menuInfo.getQuantity()) {
                        throw new IllegalArgumentException(
                                "Insufficient quantity for menu ID: " + menuInfo.getFid());
                    }
                    return (long) (menu.getFoodPrice() * menuInfo.getQuantity());
                })
                .sum();
    }

    @Override
    public List<OrderResponse> getOrders(Long uid) {
        return convertToOrderResponse(orderRepository.findAllByUserUid(uid));
    }

    public List<OrderResponse> convertToOrderResponse(List<Order> orders) {
        return orders.stream()
                .map(order -> {
                    OrderResponse.OrderResponseBuilder builder = OrderResponse.builder()
                            .oid(order.getOid())
                            .orderDate(order.getOrderDate())
                            .orderTotal(order.getOrderTotal())
                            .orderAddress(order.getOrderAddress())
                            .paymentMode(order.getPaymentMode());

                    List<Menu> menus = order.getOrderMappings().stream()
                            .map(OrderMapping::getMenu)
                            .collect(Collectors.toList());

                    builder.menus(menus);

                    return builder.build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public CountResponse orderCount() {
        long count = orderRepository.count();
        return CountResponse.builder().count(count).build();
    }

}
