import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
})
export class AddImageComponent {
  selectedFiles: any;
  currentFile: File;
  constructor(private fb: FormBuilder, private service: ImagesService) {}

  imageForm: FormGroup = this.fb.group({
    image: ['', [Validators.required]],
  });

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadImage() {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      this.service.postImages(this.currentFile).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: Response) => {
          console.log(error);
        }
      );
    } else {
      console.log('no file selected');
    }
  }
}
