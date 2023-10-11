package com.creativefusion.sneha.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creativefusion.sneha.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    Optional<Menu> findByFoodName(String foodName);

    Menu findByMid(Long mid);

    void deleteByMid(Long mid);


}
