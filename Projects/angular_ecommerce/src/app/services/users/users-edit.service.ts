import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersEditComponent } from 'src/app/components/users-edit/users-edit.component';

@Injectable({
  providedIn: 'root'
})
export class UsersEditService {

  constructor(private modalService: NgbModal) {}

  public confirm(
    uID: number,
    btnOkText: string = 'Update',
    btnCancelText: string = 'Cancel',
    dialogSize = '50vw'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(UsersEditComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.uID = uID;

    return modalRef.result;
  }
}
