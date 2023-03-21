package com.example.angularimages.controllers;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("{id}")
    public images getImageByID(@PathVariable int id) {
        return service.getImageById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> saveImage(@RequestParam("image") MultipartFile file) throws IOException {
        MultipartFile File = file;
        images Image = new images(File.getOriginalFilename(), File.getBytes());
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (File.getSize() / 1000 <= 1024) {
                Image.setImage(File.getBytes());
                Image.setName(File.getOriginalFilename());
                service.uploadImage(Image);
                map.put("status", 200);
                map.put("message", "image uploaded Successfully!");
                return new ResponseEntity<>(map, HttpStatus.CREATED);

            } else {
                map.clear();
                map.put("status", 413);
                map.put("message", "image size exceeded");
                return new ResponseEntity<>(map, HttpStatus.PAYLOAD_TOO_LARGE);
            }
        } catch (Exception e) {
            System.out.println(e);
            map.clear();
            map.put("status", 500);
            map.put("message", "internal server error");
            return new ResponseEntity<>(map, HttpStatus.PAYLOAD_TOO_LARGE);
        }
    }
}
