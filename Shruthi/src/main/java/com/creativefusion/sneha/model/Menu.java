package com.creativefusion.sneha.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;

    @Column(length = 250, nullable = false)
    private String foodName;

    @Column(nullable = false)
    private float foodPrice;

    @Column(nullable = false)
    private Long foodQuantity;

    @Column(nullable = false)
    private String foodImage;

    @Column(length = 50000, nullable = true)
    private String foodDesc;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Hotel hotel;
}
