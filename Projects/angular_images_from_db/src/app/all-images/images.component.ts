import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent {
  images: any;
  constructor(
    private service: ImagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.service.getImages().subscribe((data: any) => {
      console.log(data);
      this.images = data.map(this.convertImage);
    });
  }

  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
    };
  }
}
