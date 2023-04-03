import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  product: any;
  product_ID: any;
  user_ID: any;
  currentProduct: any;
  products: any;
  quantity: number = 0;

  constructor(
    private service: ProductsService,
    private router: Router,
    private cart_service: CartService,
    private user_service: UsersService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.product_ID = localStorage.getItem('currentProductID');
    this.getProduct();
    this.getProducts();

    let uname = sessionStorage.getItem('username');
    this.user_service.getUserByUsername(uname).subscribe((res: any) => {
      if (res.status == 200) {
        this.user_ID = res.data[0].id;

        localStorage.setItem('currentProductID', this.product_ID);
        this.router.navigate(['/current_product']);

        this.cart_service
          .getAllCartItemsByUserIdProductId(this.user_ID, this.product_ID)
          .subscribe((res: any) => {
            if (res.status == 200) {
              this.quantity = res.data[0].quantity;
              console.log('quantity set');
            } else {
              console.log('data not found');
            }
          });
      }
    });
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
    this.service.getProductByID(this.product_ID).subscribe((data: any) => {
      const _product = [data];
      this.product = _product.map(this.convertImage);
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

  goToProduct(product_id: any) {
    this.quantity = 0;
    let uname = sessionStorage.getItem('username');
    this.user_service.getUserByUsername(uname).subscribe((res: any) => {
      if (res.status == 200) {
        this.user_ID = res.data[0].id;

        localStorage.setItem('currentProductID', product_id);
        this.router.navigate(['/current_product']);

        this.cart_service
          .getAllCartItemsByUserIdProductId(this.user_ID, product_id)
          .subscribe((res: any) => {
            if (res.status == 200) {
              this.quantity = res.data[0].quantity;
              console.log('quantity set');
            } else {
              console.log('data not found');
            }
          });

        this.ngOnInit();
      }
    });
  }

  addToCart() {
    if (sessionStorage.getItem('username')) {
      let uname = sessionStorage.getItem('username');
      this.user_service.getUserByUsername(uname).subscribe((res: any) => {
        console.log(res);
        this.user_ID = res.data[0].id;
        let cartItem = { product_id: this.product_ID, user_id: this.user_ID };
        console.log(cartItem);

        this.cart_service.addItemToCart(cartItem).subscribe((res: any) => {
          if (res.status == 201) {
            this.quantity = 1;
            console.log('added to cart');
          } else {
            console.log('not added');
          }
        });
      });
    } else {
      this.OpenLoginDialog();
    }
  }

  increase_quantity() {
    if (this.quantity >= 0) {
      this.cart_service
        .increaseItemQuantity(this.user_ID, this.product_ID)
        .subscribe((res: any) => {
          if (res.status == 201) {
            this.quantity++;
            console.log('quantity increased');
          } else {
            console.log('not increased');
          }
        });
    }
  }

  decrease_quantity() {
    if (this.quantity > 0) {
      this.cart_service
        .decreaseItemQuantity(this.user_ID, this.product_ID)
        .subscribe((res: any) => {
          if (res.status == 201) {
            this.quantity--;
            if (this.quantity == 0) {
              this.cart_service
                .removeFromCart(this.user_ID, this.product_ID)
                .subscribe((res: any) => {
                  if (res.status == 200) {
                    this.quantity = 0;
                    console.log('item removed');
                  } else {
                    console.log('not removed');
                  }
                });
            }
            console.log('quantity decreased');
          } else {
            console.log('not decreased');
          }
        });
    }
  }

  OpenLoginDialog() {
    Swal.fire({
      title: 'Please Login to continue',
      html: `Once logged in you can add items to your cart.`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Login',
      denyButtonText: `Cancel`,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }
}
