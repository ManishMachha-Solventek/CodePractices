package com.example.mongodb_crud.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mongodb_crud.document.Books;
import com.example.mongodb_crud.repository.BooksRepo;
import com.example.mongodb_crud.service.BooksService;

@Service
public class BooksServiceImpl implements BooksService {

    @Autowired
    private BooksRepo repo;

    @Override
    public List<Books> getBooks() {
        return repo.findAll();
    }

    @Override
    public void deleteBookById(String id) {
        repo.deleteById(id);
    }

}
