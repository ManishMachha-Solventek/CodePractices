import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { EditOverlayService } from '../edit-overlay.service';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent {
  // all images
  images: any;

  // to update image
  selectedFiles: any;
  currentFile: File;

  // search input
  search: any;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'name', 'image', 'edit', 'delete'];

  // constructor
  constructor(
    private service: ImagesService,
    private editOverlayService: EditOverlayService,
    private fb: FormBuilder,
    private confirmService: ConfirmationDialogService
  ) {}

  // on init
  ngOnInit() {
    this.getImages();
  }

  // add image form
  addImageForm: FormGroup = this.fb.group({
    image: ['', [Validators.required]],
  });

  // select new image
  selectFile1(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // upload new image
  uploadImage() {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      this.service.postImages(this.currentFile).subscribe(
        (response: any) => {
          this.addImageForm.reset();
          this.getImages();
        },
        (error: Response) => {
          console.log(error);
        }
      );
    } else {
      console.log('no file selected');
    }
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  // get all images
  getImages() {
    this.service.getImages().subscribe((data: any) => {
      this.images = data.map(this.convertImage);

      console.log(data);
      this.dataSource = new MatTableDataSource<any>(this.images);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // update image
  updateImage(id: any) {
    this.editOverlayService
      .confirm(id)
      .then(() => {
        this.getImages();
      })
      .catch(() => {
        console.log('user cancelled dialog');
      });
  }

  // delete image
  deleteImage(id: any) {

    this.confirmService
      .confirm('Are you sure..', 'You want to delete ?', '')
      .then(() => {
        this.service.deleteImage(id).subscribe(() => {
          this.getImages();
        });
      })
      .catch(() => {
        console.log('user cancelled dialog');
      });
  }

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
    };
  }

  // filter function
  applyFilter() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }
}
