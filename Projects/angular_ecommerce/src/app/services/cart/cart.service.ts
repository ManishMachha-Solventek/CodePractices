import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  username = sessionStorage.getItem('username');
  password = sessionStorage.getItem('password');

  baseURL = 'http://192.168.0.123:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    }),
  };

  addItemToCart(item: any) {
    return this.http.post<Object[]>(
      `${this.baseURL}/cart/add`,
      item,
      this.httpOptions
    );
  }

  increaseItemQuantity(user_id: any, product_id: any) {
    return this.http.put<Object[]>(
      `${this.baseURL}/cart/inc_quan/${user_id}/${product_id}`,
      null,
      this.httpOptions
    );
  }

  decreaseItemQuantity(user_id: any, product_id: any) {
    return this.http.get<Object[]>(
      `${this.baseURL}/cart/dec_quan/${user_id}/${product_id}`,
      this.httpOptions
    );
  }

  removeFromCart(user_id: any, product_id: any) {
    return this.http.delete<Object[]>(
      `${this.baseURL}/cart/remove/${user_id}/${product_id}`,
      this.httpOptions
    );
  }

  getAllCartItemsByUserIdProductId(user_id: any, product_id: any) {
    return this.http.get<Object[]>(
      `${this.baseURL}/cart/cart_items/${user_id}/${product_id}`,
      this.httpOptions
    );
  }

  getAllCartItemsByUserId(user_id: any) {
    return this.http.get<Object[]>(
      `${this.baseURL}/cart/cart_items/${user_id}`,
      this.httpOptions
    );
  }
}
