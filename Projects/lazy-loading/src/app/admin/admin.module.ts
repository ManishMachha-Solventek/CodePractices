import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

console.warn('Admin module loaded');

@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
