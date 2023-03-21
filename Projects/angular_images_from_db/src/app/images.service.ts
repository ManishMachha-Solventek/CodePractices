import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}
  baseURL = 'http://localhost:8080';
  getImages() {
    return this.http.get(this.baseURL);
  }
}
