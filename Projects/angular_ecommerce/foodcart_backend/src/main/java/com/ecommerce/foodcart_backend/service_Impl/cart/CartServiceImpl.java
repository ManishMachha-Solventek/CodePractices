package com.ecommerce.foodcart_backend.service_Impl.cart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.foodcart_backend.entity.cart;
import com.ecommerce.foodcart_backend.repo.cartRepo;
import com.ecommerce.foodcart_backend.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private cartRepo repo;

    @Override
    public List<cart> getAllCartItems() {
        return repo.findAll();
    }

    @Override
    public void addItemToCart(cart cart_) {
        repo.save(cart_);
    }

    @Override
    public cart getCartItemById(int id) {
        return repo.findById(id).get();
    }

    @Override
    public List<cart> getAllCartItemsByUserId(int id) {
        return repo.getAllCartItemsByUserId(id);
    }

    @Override
    public void deleteCartItem(int id) {
        repo.deleteById(id);
    }

    @Override
    public void updateCartItem(cart cart_) {
        repo.save(cart_);
    }

}
