package com.ecommerce.foodcart_backend.service;

import java.util.List;

import com.ecommerce.foodcart_backend.entity.cart;

public interface CartService {

    public List<cart> getAllCartItems();

    public void removeAllCartItems(int user_id);

    public void addItemToCart(cart cart_);

    public cart getCartItemById(int id);

    public List<cart> getAllCartItemsByUserId(int id);

    public void deleteCartItem(int id);

    public void updateCartItem(cart image);

}
