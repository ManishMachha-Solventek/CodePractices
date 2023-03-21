package com.example.angularimages.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.angularimages.entity.images;
import com.example.angularimages.service.images_service;

@RestController
@CrossOrigin("*")
@RequestMapping("images")
public class image_Controller {

    @Autowired
    private images_service service;

    @GetMapping("")
    public List<images> getImages() {
        return service.getImages();
    }

    @PostMapping("")
    public String saveImage(@RequestParam("image") MultipartFile file) throws IOException {
        MultipartFile File = file;
        images Image = new images(File.getName(), File.getBytes());
        try {
            if (File.getSize() / 1000 <= 1024) {
                Image.setImage(File.getBytes());
                Image.setName(File.getName());
                service.uploadImage(Image);
                return "true";
            } else {
                return "false";
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}
