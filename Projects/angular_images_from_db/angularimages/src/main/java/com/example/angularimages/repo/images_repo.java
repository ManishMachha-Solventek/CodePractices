package com.example.angularimages.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.angularimages.entity.images;

public interface images_repo extends JpaRepository<images,Integer>{
    
}
