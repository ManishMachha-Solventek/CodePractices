package com.example.mongodb_crud.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.mongodb_crud.document.Books;
import com.example.mongodb_crud.repository.BooksRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mongodb_crud.service.BooksService;

@RestController
@RequestMapping("books")
public class BooksController {

    @Autowired
    private BooksService service;

    @Autowired
    private BooksRepo repo;

    @GetMapping("")
    public List<Books> getBooks() {
        return service.getBooks();
    }

    @GetMapping("{id}")
    public Books getBooksById(@PathVariable("id") String id) {
        return repo.getBooksById(id);
    }

    @DeleteMapping("{id}")
    public Map<String, String> deleteBookById(@PathVariable("id") String id) {
        service.deleteBookById(id);
        Map<String, String> map = new HashMap<String, String>();
        map.put("message", "Deleted book with ID: " + id);
        return map;
    }

    @PostMapping("")
    public Map<String, String> saveBook(@RequestBody Books book) {
        repo.save(book);
        Map<String, String> map = new HashMap<String, String>();
        map.put("message", "Added book: " + book.getName());
        return map;
    }

    @PutMapping("{id}")
    public Map<String, String> updateBook(@PathVariable("id") String id, @RequestBody Books book) {
        Books myBook = repo.findById(id).get();
        myBook.setName(book.getName());
        myBook.setQuantity(book.getQuantity());
        myBook.setCategory(book.getCategory());
        repo.save(myBook);
        Map<String, String> map = new HashMap<String, String>();
        map.put("message", "Updated book: " + book.getName());
        return map;
    }
}
