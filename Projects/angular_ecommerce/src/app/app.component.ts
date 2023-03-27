import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'angular_ecommerce';
  role = sessionStorage.getItem('role');
  isAdmin: boolean = false;

  ngOnInit() {
    if (this.role) {
      if (this.role == 'ROLE_ADMIN') {
        this.isAdmin = true;
        // window.location.replace('products');
      } else {
        this.isAdmin = false;
      }
    }
  }
}
