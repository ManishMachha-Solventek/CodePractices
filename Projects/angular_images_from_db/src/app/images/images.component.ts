import { Component } from '@angular/core';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent {
  constructor(private service: ImagesService) {}

  image: Blob;

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.service.getImages().subscribe((res: any) => {
      this.image = res.image;
    });
  }

}
