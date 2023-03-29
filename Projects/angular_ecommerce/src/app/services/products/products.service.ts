import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  baseURL = 'http://localhost:8081/products';

  username = sessionStorage.getItem('username');
  password = sessionStorage.getItem('password');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
    }),
  };

  getImages() {
    return this.http.get(this.baseURL);
  }

  getActiveProducts() {
    return this.http.get(`${this.baseURL}/active`);
  }

  getProductByID(id: any) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  postImages(image: File, name: string, info: string, active: string) {
    const data: FormData = new FormData();
    data.append('image', image);
    data.append('name', name);
    data.append('info', info);
    data.append('active', active);
    return this.http.post(this.baseURL, data);
  }

  putImages(id: any, image: File, name: string, info: string, active: string) {
    const data: FormData = new FormData();
    data.append('image', image);
    data.append('name', name);
    data.append('info', info);
    data.append('active', active);
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  deleteImage(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
