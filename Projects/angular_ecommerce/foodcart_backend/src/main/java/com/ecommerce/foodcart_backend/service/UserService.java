package com.ecommerce.foodcart_backend.service;

import java.util.List;

import com.ecommerce.foodcart_backend.entity.Users;

public interface UserService {

    public List<Users> getUsers();

    public void saveUser(Users user);

    public Users getUserByID(int id);

    public void deleteUser(Users user);

    public void updateUser(Users user);
}
