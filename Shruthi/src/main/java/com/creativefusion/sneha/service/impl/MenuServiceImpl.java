package com.creativefusion.sneha.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.creativefusion.sneha.dto.request.MenuRequest;
import com.creativefusion.sneha.dto.response.CountResponse;
import com.creativefusion.sneha.dto.response.MenuResponse;
import com.creativefusion.sneha.model.Menu;
import com.creativefusion.sneha.repository.HotelRepository;
import com.creativefusion.sneha.repository.MenuRepository;
import com.creativefusion.sneha.service.MenuService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    private final HotelRepository hotelRepository;

    @Override
    public boolean saveMenu(MenuRequest request) {
        if (menuRepository.findByFoodName(request.getFoodName()).isPresent()) {
            return false;
        }

        Menu menu = Menu.builder()
               .foodName(request.getFoodName())
                .foodPrice(request.getFoodPrice())
                .foodQuantity(request.getFoodQuantity())
                .foodDesc(request.getFoodDesc())
                .foodImage(request.getFoodImage())
                .hotel(hotelRepository.findByHid(request.getHid()))
                .build();

        menuRepository.save(menu);
        return true;
    }

    @Override
    public List<MenuResponse> getAllMenu() {
        List<Menu> productList = menuRepository.findAll();

        return productList.stream()
                .map(this::mapMenuToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MenuResponse getMenu(Long mid) {
        Menu menu = menuRepository.findByMid(mid);
        return mapMenuToResponse(menu);
    }

    @Override
    public MenuResponse updateMenu(MenuRequest request, Long mid) {
        Menu menu = menuRepository.findByMid(mid);

        if (menu != null) {
            menu.setFoodName(request.getFoodName());
            menu.setFoodPrice(request.getFoodPrice());
            menu.setFoodQuantity(request.getFoodQuantity());
            menu.setFoodDesc(request.getFoodDesc());
            menu.setFoodImage(request.getFoodImage());
            menu.setHotel(hotelRepository.findByHid(request.getHid()));
            menuRepository.save(menu);

            return mapMenuToResponse(menu);
        } else {
            throw new EntityNotFoundException("Menu with mid " + mid + " not found");
        }
    }

    @Override
    public boolean deleteMenu(Long mid) {
        Menu menu = menuRepository.findByMid(mid);

        if (menu != null) {
            menuRepository.deleteByMid(mid);
            return true;
        } else {
            return false;
        }
    }

    private MenuResponse mapMenuToResponse(Menu menu) {
        return MenuResponse.builder()
                .mid(menu.getMid())
                .foodName(menu.getFoodName())
                .foodPrice(menu.getFoodPrice())
                .foodQuantity(menu.getFoodQuantity())
                .foodDesc(menu.getFoodDesc())
                .foodImage(menu.getFoodImage())
                .build();
    }

    @Override
    public Menu getMenuModelId(Long mid) {
        return menuRepository.findByMid(mid);
    }

    @Override
    public CountResponse productCount() {
        long count = menuRepository.count();
        return CountResponse.builder().count(count).build();
    }
}
