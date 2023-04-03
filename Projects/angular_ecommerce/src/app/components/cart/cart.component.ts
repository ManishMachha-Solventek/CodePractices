import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products: any[];
  user_ID: any;
  myCartItems: any[] = [];
  constructor(
    private service: CartService,
    private user_service: UsersService,
    private router: Router,
    private product_service: ProductsService
  ) {}

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
      info: data.info,
      quantity: data.quantity,
    };
  }

  // getting whole product from product_id
  productFromProductID() {
    for (let i = 0; i < this.products.length; i++) {
      this.product_service
        .getProductByID(this.products[i].product_id)
        .subscribe((res: any) => {
          res.quantity = this.products[i].quantity;
          let temp = [];
          temp.push(res);
          temp = temp.map(this.convertImage);
          this.myCartItems.push(temp[0]);
        });
    }
  }

  // get cart items
  getCartItems() {
    let uname = sessionStorage.getItem('username');
    this.user_service.getUserByUsername(uname).subscribe((res: any) => {
      if (res.status == 200) {
        this.user_ID = res.data[0].id;
        this.service
          .getAllCartItemsByUserId(this.user_ID)
          .subscribe((data: any) => {
            this.products = data.data;
            this.productFromProductID();
          });
      }
    });
  }

  goToProduct(id: any) {
    localStorage.setItem('currentProductID', id);
    this.router.navigate([`/current_product`]);
  }

  ngOnInit() {
    this.getCartItems();
  }

  removeFromCart(product_id: any) {
    this.service
      .removeFromCart(this.user_ID, product_id)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.myCartItems = [];
          this.getCartItems();
          console.log('item removed');
        } else {
          console.log('not removed');
        }
      });
  }

  increase_quantity(product_id: any) {
    this.service
      .increaseItemQuantity(this.user_ID, product_id)
      .subscribe((res: any) => {
        if (res.status == 201) {
          console.log('quantity increased');
          this.myCartItems = [];
          this.getCartItems();
        } else {
          console.log('not increased');
        }
      });
  }

  decrease_quantity(product_id: any) {
    this.service
      .decreaseItemQuantity(this.user_ID, product_id)
      .subscribe((res: any) => {
        if (res.status == 201) {
          console.log('quantity decreased');
          this.myCartItems = [];
          this.getCartItems();
        } else {
          console.log('not decreased');
        }
      });
  }
}