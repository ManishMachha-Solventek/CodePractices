package com.example.angularimages.service;

import java.util.List;

import com.example.angularimages.entity.images;

public interface images_service {

    public List<images> getImages();

    public void uploadImage(images image);

    public images getImageById(int id);

}
