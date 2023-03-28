import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  imageObject: Array<object> = [
    { thumbImage: '../../../assets/images/store1.jpg' },
    { thumbImage: '../../../assets/images/store2.jpg' },
    { thumbImage: '../../../assets/images/store3.jpg' },
    { thumbImage: '../../../assets/images/store4.jpg' },
  ];

  products: any;

  constructor(private service: ProductsService) {}

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
      info: data.info,
      active: data.active,
    };
  }

  // get all images
  getProducts() {
    this.service.getImages().subscribe((data: any) => {
      this.products = data.map(this.convertImage);
    });
  }

  ngOnInit() {
    this.getProducts();
  }
}
