package com.ecommerce.foodcart_backend.controllers;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.foodcart_backend.entity.products;
import com.ecommerce.foodcart_backend.repo.productsRepo;
import com.ecommerce.foodcart_backend.service.ProductService;

@RestController
@CrossOrigin("*")
@RequestMapping("products")
public class productsController {

    @Autowired
    private ProductService service;

    @Autowired
    private productsRepo repo;

    // get images
    @GetMapping("")
    public List<products> getImages() {
        return service.getImages();
    }

    // get active products
    @GetMapping("active")
    public List<products> getActiveProducts() {
        return repo.getActiveProducts();
    }

    // get image by ID
    @GetMapping("{id}")
    public products getImageByID(@PathVariable int id) {
        return service.getImageById(id);
    }

    // delete image by ID
    @DeleteMapping("{id}")
    public void deleteImageByID(@PathVariable int id) {
        service.deleteImage(id);
    }

    // update image
    @PutMapping("{id}")
    public ResponseEntity<?> updateImageByID(@PathVariable int id,
            @RequestParam("image") MultipartFile file, @RequestParam Map<String, String> pathvarsMap)
            throws IOException {

        MultipartFile File = file;
        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            if (File.getSize() / 1000 <= 1024) {
                products image = service.getImageById(id);
                image.setId(id);
                image.setName(pathvarsMap.get("name"));
                image.setActive(pathvarsMap.get("active"));
                image.setInfo(pathvarsMap.get("info"));
                image.setImage(File.getBytes());
                service.updateImage(image);
                map.put("status", 200);
                map.put("message", "image updated Successfully!");
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

    // post image
    @PostMapping("")
    public ResponseEntity<?> saveImage(@RequestParam("image") MultipartFile file,
            @RequestParam Map<String, String> pathvarsMap) throws IOException {
        MultipartFile File = file;
        products Image = new products(File.getOriginalFilename(), File.getBytes());
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (File.getSize() / 1000 <= 1024) {
                Image.setImage(File.getBytes());
                Image.setName(pathvarsMap.get("name"));
                Image.setActive(pathvarsMap.get("active"));
                Image.setInfo(pathvarsMap.get("info"));
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
