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
      price: data.price,
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
    this.myCartItems = this.removeObjectWithId(this.myCartItems, product_id);

    this.service
      .removeFromCart(this.user_ID, product_id)
      .subscribe((res: any) => {
        if (res.status == 200) {
          console.log('item removed');
        } else {
          console.log('not removed');
        }
      });
  }

  // remove item from cart in template
  removeObjectWithId(arr: any[], id: number) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  }

  increase_quantityWithId(arr: any[], id: number) {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        index = i;
        break;
      }
    }
    console.log(index);
    return index;
  }

  increase_quantity(product_id: any) {
    let index = this.increase_quantityWithId(this.myCartItems, product_id);
    this.myCartItems[index].quantity++;

    this.service
      .increaseItemQuantity(this.user_ID, product_id)
      .subscribe((res: any) => {
        if (res.status == 201) {
          console.log('quantity increased');
        } else {
          console.log('not increased');
        }
      });
  }

  decrease_quantity(product_id: any) {
    let index = this.increase_quantityWithId(this.myCartItems, product_id);

    if (this.myCartItems[index].quantity == 1) {
      this.myCartItems.splice(index, 1);

      this.service
        .removeFromCart(this.user_ID, product_id)
        .subscribe((res: any) => {
          if (res.status == 201) {
            console.log('item removed');
          } else {
            console.log('item not removed');
          }
        });
    }

    this.myCartItems[index].quantity--;

    this.service
      .decreaseItemQuantity(this.user_ID, product_id)
      .subscribe((res: any) => {
        if (res.status == 201) {
          console.log('quantity decreased');
        } else {
          console.log('not decreased');
        }
      });
  }

  removeAllItems() {
    this.myCartItems = [];
    this.service.removeAllFromCart(this.user_ID).subscribe((res: any) => {
      if (res.status == 200) {
        this.ngOnInit();
        console.log('all items removed');
      } else {
        console.log('all items not removed');
      }
    });
  }
}
