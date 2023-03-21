import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}
  baseURL = 'http://localhost:8080/images';
  getImages() {
    return this.http.get(this.baseURL);
  }

  postImages(image: File) {
    const data: FormData = new FormData();
    data.append('image', image);
    return this.http.post(this.baseURL, data);
  }
}
