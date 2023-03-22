import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-edit-overlay',
  templateUrl: './edit-overlay.component.html',
  styleUrls: ['./edit-overlay.component.css'],
})
export class EditOverlayComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() uID: number;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: ImagesService,
    private _snackBar: MatSnackBar
  ) {}

  selectedFiles: any;
  currentFile: File;
  updateID: any = null;

  imageForm: FormGroup = this.fb.group({
    image: ['', [Validators.required]],
  });

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public decline() {
    this.activeModal.dismiss(false);
  }

  public accept(ID: any) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      this.service.putImages(ID, this.currentFile).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == 200) {
            this.imageForm.reset();
            this.activeModal.close(true);
          }
        },
        (error: Response) => {
          console.log(error);
        }
      );
    } else {
      console.log('no file selected');
    }
  }

  public dismiss() {
    this.activeModal.dismiss(false);
  }

  getImagedata(id: any) {
    this.service.getImageByID(id).subscribe((res: any) => {
      this.updateID = res.id;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['updateSnackbar'],
    });
  }

  ngOnInit() {
    this.getImagedata(this.uID);
  }
}
