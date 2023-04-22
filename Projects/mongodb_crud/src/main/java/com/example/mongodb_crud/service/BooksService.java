package com.example.mongodb_crud.service;

import java.util.List;

import com.example.mongodb_crud.document.Books;

public interface BooksService {

    public List<Books> getBooks();

    public void deleteBookById(String id);
}
