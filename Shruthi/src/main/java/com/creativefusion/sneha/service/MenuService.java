package com.creativefusion.sneha.service;

import java.util.List;

import com.creativefusion.sneha.dto.request.MenuRequest;
import com.creativefusion.sneha.dto.response.CountResponse;
import com.creativefusion.sneha.dto.response.MenuResponse;
import com.creativefusion.sneha.model.Menu;

public interface MenuService {

    boolean saveMenu(MenuRequest request);

    List<MenuResponse> getAllMenu();

    MenuResponse getMenu(Long mid);

    MenuResponse updateMenu(MenuRequest request, Long mid);

    boolean deleteMenu(Long mid);

    Menu getMenuModelId(Long mid);

    CountResponse productCount();

}
