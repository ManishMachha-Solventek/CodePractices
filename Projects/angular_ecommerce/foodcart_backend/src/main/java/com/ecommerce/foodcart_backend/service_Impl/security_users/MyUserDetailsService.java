package com.ecommerce.foodcart_backend.service_Impl.security_users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ecommerce.foodcart_backend.entity.Users;
import com.ecommerce.foodcart_backend.repo.usersRepo;

public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private usersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> Users = usersRepo.findByUsername(username);
        return Users.map(MyUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }

}
