import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ass15AccRecoveryComponent } from './ass15-acc-recovery/ass15-acc-recovery.component';
import { Ass15ContactUsComponent } from './ass15-contact-us/ass15-contact-us.component';
import { Ass15HomeComponent } from './ass15-home/ass15-home.component';
import { Ass15LoginComponent } from './ass15-login/ass15-login.component';
import { Ass15MyaccountComponent } from './ass15-myaccount/ass15-myaccount.component';
import { Ass15RegisterComponent } from './ass15-register/ass15-register.component';
import { Ass15UsersComponent } from './ass15-users/ass15-users.component';

const routes: Routes = [
  { path: '', component: Ass15HomeComponent },
  { path: 'home', component: Ass15HomeComponent },
  { path: 'register', component: Ass15RegisterComponent },
  { path: 'users', component: Ass15UsersComponent },
  { path: 'login', component: Ass15LoginComponent },
  { path: 'myaccount', component: Ass15MyaccountComponent },
  { path: 'acc_recovery', component: Ass15AccRecoveryComponent },
  { path: 'contact', component: Ass15ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
