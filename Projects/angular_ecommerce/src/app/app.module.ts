import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { UsersService } from './services/users/users.service';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { StoreComponent } from './components/store/store.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { SingleProductComponent } from './components/single-product/single-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    PaymentComponent,
    ConfirmationDialogComponent,
    ContactUsComponent,
    SignupComponent,
    AdminDashboardComponent,
    UsersComponent,
    ProductsComponent,
    MyaccountComponent,
    UsersEditComponent,
    UsersAddComponent,
    ProductsEditComponent,
    ProductsAddComponent,
    StoreComponent,
    SingleProductComponent,
  ],
  imports: [
    NgImageSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatListModule
  ],
  providers: [UsersService, MatSnackBar],
  bootstrap: [AppComponent],
})
export class AppModule {}
