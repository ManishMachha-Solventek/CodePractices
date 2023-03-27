import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog/confirmation-dialog.service';
import { ProductsEditService } from 'src/app/services/products/products-edit.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
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
    private service: ProductsService,
    private editOverlayService: ProductsEditService,
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
