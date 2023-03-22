package com.example.angularimages.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.angularimages.entity.images;
import com.example.angularimages.repo.images_repo;

@Service
public class images_service_impl implements images_service {

    @Autowired
    private images_repo repo;

    @Override
    public List<images> getImages() {
        return repo.findAll();
    }

    @Override
    public void uploadImage(images image) {
        repo.save(image);
    }

    @Override
    public images getImageById(int id) {
        return repo.findById(id).get();
    }

    @Override
    public void deleteImage(int id) {
        repo.deleteById(id);
    }

    @Override
    public void updateImage(images image) {
       repo.save(image);
    }

}
