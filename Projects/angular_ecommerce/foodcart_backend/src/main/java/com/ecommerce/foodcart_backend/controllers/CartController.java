package com.ecommerce.foodcart_backend.controllers;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.ecommerce.foodcart_backend.entity.cart;
import com.ecommerce.foodcart_backend.repo.cartRepo;
import com.ecommerce.foodcart_backend.service.CartService;

@RestController
@RequestMapping("cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private cartRepo repo;

    @PostMapping("add")
    public ResponseEntity<?> addToCart(@RequestBody cart cart) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            cart.setQuantity(1);
            cartService.addItemToCart(cart);
            map.put("status", 201);
            map.put("message", "Added to cart Successfully!");
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        } catch (Exception e) {
            map.clear();
            map.put("status", 500);
            map.put("message", "Internal server error");
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("inc_quan/{user_id}/{product_id}")
    public ResponseEntity<?> increaseItemQuantity(@PathVariable Map<String, String> pathVarsMap) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int user_id = Integer.parseInt(pathVarsMap.get("user_id"));
        int product_id = Integer.parseInt(pathVarsMap.get("product_id"));
        try {
            repo.increaseItemQuantity(user_id, product_id);
            map.put("status", 201);
            map.put("message", "Quantity increased Successfully!");
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            map.clear();
            map.put("status", 500);
            map.put("message", "Internal server error");
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("dec_quan/{user_id}/{product_id}")
    public ResponseEntity<?> decreaseItemQuantity(@PathVariable Map<String, String> pathVarsMap) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int user_id = Integer.parseInt(pathVarsMap.get("user_id"));
        int product_id = Integer.parseInt(pathVarsMap.get("product_id"));
        try {
            repo.decreaseItemQuantity(user_id, product_id);
            map.put("status", 201);
            map.put("message", "Quantity decreased Successfully!");
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        } catch (Exception e) {
            map.clear();
            map.put("status", 500);
            map.put("message", "Internal server error");
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
