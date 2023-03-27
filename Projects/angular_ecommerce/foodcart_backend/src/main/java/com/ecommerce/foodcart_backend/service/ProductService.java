package com.ecommerce.foodcart_backend.service;

import java.util.List;

import com.ecommerce.foodcart_backend.entity.products;

public interface ProductService {

    public List<products> getImages();

    public void uploadImage(products image);

    public products getImageById(int id);

    public void deleteImage(int id);

    public void updateImage(products image);

}
