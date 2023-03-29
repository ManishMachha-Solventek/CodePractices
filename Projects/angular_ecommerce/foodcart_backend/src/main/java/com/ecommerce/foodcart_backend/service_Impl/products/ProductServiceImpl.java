package com.ecommerce.foodcart_backend.service_Impl.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.foodcart_backend.entity.products;
import com.ecommerce.foodcart_backend.repo.productsRepo;
import com.ecommerce.foodcart_backend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private productsRepo repo;

    @Override
    public List<products> getImages() {
        return repo.findAll();
    }

    @Override
    public void uploadImage(products image) {
        repo.save(image);
    }

    @Override
    public products getImageById(int id) {
        return repo.findById(id).get();
    }

    @Override
    public void deleteImage(int id) {
        repo.deleteById(id);
    }

    @Override
    public void updateImage(products image) {
       repo.save(image);
    }

}
