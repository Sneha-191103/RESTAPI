package com.creativefusion.sneha.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creativefusion.sneha.dto.request.MenuRequest;
import com.creativefusion.sneha.dto.response.CountResponse;
import com.creativefusion.sneha.dto.response.MenuResponse;
import com.creativefusion.sneha.service.MenuService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Tag(name = "Product")
public class MenuController {

    private final MenuService menuService;

    @PostMapping("/add")
    public ResponseEntity<String> saveProduct(@RequestBody MenuRequest request) {
        boolean isSaved = menuService.saveMenu(request);
        return isSaved ? ResponseEntity.status(201).body("Menu added successfully!")
                : ResponseEntity.badRequest().build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<MenuResponse>> getAllProducts() {
        List<MenuResponse> productList = menuService.getAllMenu();
        return !productList.isEmpty() ? ResponseEntity.status(200).body(productList)
                : ResponseEntity.noContent().build();
    }

    @GetMapping("/getCount")
    public ResponseEntity<CountResponse> productCount() {
        CountResponse countResponse = menuService.productCount();
        return countResponse.getCount() != 0 ? ResponseEntity.ok().body(countResponse)
                : ResponseEntity.noContent().build();
    }

    @GetMapping("/find/{mid}")
    public ResponseEntity<MenuResponse> getProduct(@PathVariable Long mid) {
        MenuResponse menuResponse = menuService.getMenu(mid);
        return menuResponse != null ? ResponseEntity.ok().body(menuResponse) : ResponseEntity.notFound().build();
    }

    @PutMapping("/edit/{pid}")
    public ResponseEntity<MenuResponse> updateProduct(@RequestBody MenuRequest request, @PathVariable Long mid) {
        MenuResponse menuResponse = menuService.updateMenu(request, mid);
        return menuResponse != null ? ResponseEntity.ok().body(menuResponse) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{mid}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long mid) {
        boolean isDeleted = menuService.deleteMenu(mid);
        return isDeleted ? ResponseEntity.ok().body("Menu deleted successfully!")
                : ResponseEntity.notFound().build();
    }

}
