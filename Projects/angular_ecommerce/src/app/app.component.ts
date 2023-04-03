import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'angular_ecommerce';
  role: any = sessionStorage.getItem('role');
  isAdmin: boolean = false;

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

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
