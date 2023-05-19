import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {
   
  constructor(private dialog:MatDialogRef<LogoutDialogComponent>
   ,private router:Router ) { }

  ngOnInit() {
  }

  public decline() {
    this.dialog.close(false);
  }

  public accept() {
    this.dialog.close(true);
  }
}
