import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  session: any = sessionStorage.getItem('session');
  userRole: any;
  LoginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private user_service: UsersService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    sessionStorage.setItem('currentURL', 'login');
    if (this.session) {
      window.location.replace('users');
    }
  }

  LoginAction(form: any) {
    this.user_service.login(form.value.username, form.value.password).subscribe(
      (res: any) => {
        if (res == '200') {
          this.user_service
            .getUserByUsername(form.value.username)
            .subscribe((res: any) => {
              if (res.data[0].role === 'ROLE_ADMIN') {
                sessionStorage.setItem('session', res.data[0].username);
                sessionStorage.setItem('username', res.data[0].username);
                sessionStorage.setItem('password', form.value.password);
                sessionStorage.setItem('role', res.data[0].role);
                this.userRole = sessionStorage.getItem('role');
                window.location.replace('');
              } else {
                sessionStorage.setItem('session', res.data[0].username);
                sessionStorage.setItem('username', res.data[0].username);
                sessionStorage.setItem('password', form.value.password);
                sessionStorage.setItem('role', res.data[0].role);
                this.userRole = sessionStorage.getItem('role');
                window.location.replace('/cart');
                this.ngOnInit();
              }
            });
        }
      },
      (error: Response) => {
        if (error.status === 401) {
          console.log(error);
          sessionStorage.clear();
          this.openSnackBar('Invalid credentials');
        } else {
          this.openSnackBar('Something went wrong. Please try again.');
        }
      }
    );
  }

  togglePassword() {
    var passwordField = <HTMLInputElement>document.getElementById('password');

    if (passwordField!.type === 'password') {
      passwordField!.type = 'text';
    } else {
      passwordField!.type = 'password';
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['registerSnackbar'],
    });
  }
}
