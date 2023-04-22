package com.example.mongodb_crud.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.mongodb_crud.document.Books;

public interface BooksRepo extends MongoRepository<Books, String> {

    Books getBooksById(String id);

}
