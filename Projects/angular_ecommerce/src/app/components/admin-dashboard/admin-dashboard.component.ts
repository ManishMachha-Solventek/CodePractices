import { Component } from '@angular/core';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [fadeAnimation],

})
export class AdminDashboardComponent {
  btn1: boolean = true;

  toggleBtn1() {
    setTimeout(() => {
      this.btn1 = !this.btn1;
    }, 100);
  }
}
