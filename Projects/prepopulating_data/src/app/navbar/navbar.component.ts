import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog,
    private router:Router) { }

  ngOnInit() {
  }

  public logOutDialog() {
    let dialogref = this.dialog.open(LogoutDialogComponent, { width: '250px' })
    dialogref.afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.router.navigate([''])

      }
    })
  }
}
