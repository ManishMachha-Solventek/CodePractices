import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersAddComponent } from 'src/app/components/users-add/users-add.component';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    btnOkText: string = 'Add',
    btnCancelText: string = 'Cancel',
    dialogSize = '50vw'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(UsersAddComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
