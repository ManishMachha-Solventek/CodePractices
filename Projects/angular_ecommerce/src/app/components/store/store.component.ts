import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service: ProductsService, private router: Router) {}

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
      info: data.info,
      active: data.active,
      price: data.price,
    };
  }

  // get all images
  getProducts() {
    this.service.getActiveProducts().subscribe((data: any) => {
      this.products = data.map(this.convertImage);
    });
  }

  goToProduct(id: any) {
    localStorage.setItem('currentProductID', id);
    this.router.navigate([`/current_product`]);
  }

  ngOnInit() {
    this.getProducts();
  }
}
