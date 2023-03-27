import { Component } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  collapsed: boolean = true;
  collapsed_1 = false;
  session: any = sessionStorage.getItem('session');

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  logOut() {
    this.confirmationDialogService
      .confirm('Are you sure..', 'You want to logout ?', this.session)
      .then(() => {
        sessionStorage.clear();
        localStorage.clear();

        window.location.replace('login');
      })
      .catch(() => {
        console.log('user cancelled dialog');
      });
  }
}
