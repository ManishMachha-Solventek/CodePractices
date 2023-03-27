package com.ecommerce.foodcart_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.foodcart_backend.entity.products;

public interface productsRepo extends JpaRepository<products,Integer>{
    
}
