import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path:'',component:LoginComponent},
  { path: 'app-home',component:HomeComponent},
  { path:'app-register',component:RegisterComponent},
  { path:'app-logout-dialog',component:LogoutDialogComponent},
  { path:'app-list',component:ListComponent}
  // { path: 'userlist',component:UserlistComponent,canActivate:[LogoutGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
