import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog/confirmation-dialog.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() uID: number;

  selectedFiles: any;
  currentFile: File;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private product: ProductsService,
    private _snackBar: MatSnackBar
  ) {}

  // add image form
  addImageForm: FormGroup = this.fb.group({
    product: ['', [Validators.required]],
    name: ['', [Validators.required]],
    info: ['', [Validators.required]],
    active: ['', [Validators.required]],
  });

  public decline() {
    this.activeModal.dismiss(false);
  }

  public dismiss() {
    this.activeModal.dismiss(false);
  }

  public accept(form: any) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      this.product
        .postImages(
          this.currentFile,
          form.value.name,
          form.value.info,
          form.value.active
        )
        .subscribe(
          (response: any) => {
            form.reset();
            this.activeModal.close(true);
            Swal.fire('Product added successfully', '', 'success');
          },
          (error: Response) => {
            console.log(error);
          }
        );
    } else {
      console.log('no file selected');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // select new image
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
}
