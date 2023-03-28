import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  product: any;
  ID: any;
  currentProduct: any;
  products: any;
  
  constructor(private service: ProductsService, private router: Router) {}

  ngOnInit() {
    this.ID = localStorage.getItem('currentProductID');
    this.getProduct();
    this.getProducts();
  }

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

  // get product
  getProduct() {
    this.service.getProductByID(this.ID).subscribe((data: any) => {
      const _product = [data];
      this.product = _product.map(this.convertImage);
      console.log(this.product);
    });
  }

  imageObject: Array<object> = [
    { thumbImage: '../../../assets/images/store1.jpg' },
    { thumbImage: '../../../assets/images/store2.jpg' },
    { thumbImage: '../../../assets/images/store3.jpg' },
    { thumbImage: '../../../assets/images/store4.jpg' },
  ];

  // get all images
  getProducts() {
    this.service.getActiveProducts().subscribe((data: any) => {
      this.products = data.map(this.convertImage);
    });
  }
}
