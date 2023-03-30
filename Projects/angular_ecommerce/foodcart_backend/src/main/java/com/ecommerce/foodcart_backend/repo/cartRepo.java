package com.ecommerce.foodcart_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.foodcart_backend.entity.cart;

@Repository("cart")
public interface cartRepo extends JpaRepository<cart, Integer> {

    @Query(value = "select * from cart where user_id= ?1", nativeQuery = true)
    public List<cart> getAllCartItemsByUserId(int id);

    @Query(value = "select * from cart where user_id= ?1 and product_id=?2", nativeQuery = true)
    public List<cart> getAllCartItemsByUserIdProductId(int user_id, int product_id);

    // @Query("SELECT new com.ecommerce.foodcart_backend.dto.cartDto(p.name, p.info,
    // p.image) "
    // + "FROM products p INNER JOIN p.cart c WHERE c.user_id = ?1")
    // public List<cartDto> getAllCartItemsByUserId(int id);

    @Transactional
    @Modifying
    @Query("UPDATE cart c SET c.quantity = c.quantity + 1 WHERE c.user_id = ?1 AND c.product_id = ?2")
    public void increaseItemQuantity(int user_id, int product_id);

    @Transactional
    @Modifying
    @Query(value = "update cart c set c.quantity = c.quantity - 1 where c.user_id = ?1 and c.product_id = ?2", nativeQuery = true)
    public void decreaseItemQuantity(int user_id, int product_id);

    @Transactional
    @Modifying
    @Query(value = "delete from cart c where c.user_id = ?1 and c.product_id = ?2", nativeQuery = true)
    public void removeFromCart(int user_id, int product_id);
}
