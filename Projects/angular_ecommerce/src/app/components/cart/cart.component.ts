import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products: any;
  user_ID: any;

  constructor(
    private service: CartService,
    private user_service: UsersService,
    private router: Router
  ) {}

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      name: data.product_name,
      image: 'data:image/jpg;base64,' + data.product_image, 
      info: data.product_info,
    };
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
            this.products = data.data.map(this.convertImage);
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
}
