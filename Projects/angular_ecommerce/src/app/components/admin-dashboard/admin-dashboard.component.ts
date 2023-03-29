import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  btn1: boolean = true;

  toggleBtn1() {
    setTimeout(() => {
      this.btn1 = !this.btn1;
    }, 100);
  }
}
