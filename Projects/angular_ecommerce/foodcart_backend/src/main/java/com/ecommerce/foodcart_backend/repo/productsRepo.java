package com.ecommerce.foodcart_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.foodcart_backend.entity.products;

public interface productsRepo extends JpaRepository<products, Integer> {

    @Query(value = "select * from products where active='true'", nativeQuery = true)
    public List<products> getActiveProducts();
}
