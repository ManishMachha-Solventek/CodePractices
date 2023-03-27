import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsAddComponent } from 'src/app/components/products-add/products-add.component';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private modalService: NgbModal) {}

  public confirm(
    btnOkText: string = 'Add',
    btnCancelText: string = 'Cancel',
    dialogSize = '50vw'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ProductsAddComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
