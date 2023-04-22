package com.example.mongodb_crud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class MongodbCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(MongodbCrudApplication.class, args);
	}

}
