import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

export interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  gender: string;
  phonenumber: number;
  role: string;
}

@Component({
  selector: 'app-ass15-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
})
export class MyaccountComponent {
  session: any = sessionStorage.getItem('session');
  user: User = {
    id: 0,
    fullname: '',
    username: '',
    email: '',
    gender: '',
    phonenumber: 0,
    role: '',
  };

  constructor(private user_service: UsersService) {}

  ngOnInit() {
    sessionStorage.setItem('currentURL', 'myaccount');
    if (this.session != null) {
      this.user_service
        .getUserByUsername(this.session)
        .subscribe((res: any) => {
          this.user = res.data[0];
        });
    }
  }
}
