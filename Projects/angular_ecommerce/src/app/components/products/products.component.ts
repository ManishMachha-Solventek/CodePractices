import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddProductService } from 'src/app/services/products/add-product.service';
import { ProductsEditService } from 'src/app/services/products/products-edit.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';

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

  displayedColumns: string[] = [
    'id',
    'name',
    'image',
    'info',
    'active',
    'price',
    'edit',
    'delete',
  ];

  // constructor
  constructor(
    private service: ProductsService,
    private editOverlayService: ProductsEditService,
    private fb: FormBuilder,
    private add_service: AddProductService,
    private router: Router
  ) {}

  // on init
  ngOnInit() {
    if (
      sessionStorage.getItem('username') &&
      sessionStorage.getItem('role') == 'ROLE_ADMIN'
    ) {
      this.getImages();
    } else if (
      sessionStorage.getItem('username') &&
      sessionStorage.getItem('role') == 'ROLE_USER'
    ) {
      this.AccessDeniedDialog();
    } else {
      this.OpenLoginDialog();
    }
  }

  // add image form
  addImageForm: FormGroup = this.fb.group({
    image: ['', [Validators.required]],
  });

  // select new image
  selectFile1(event: any): void {
    this.selectedFiles = event.target.files;
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
    var NAME: string = '';
    this.service.getProductByID(id).subscribe((res: any) => {
      NAME = res.name;
      this.OpenDeleteDialog(id, NAME);
    });
  }

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
      info: data.info,
      active: data.active,
      price: data.price,
    };
  }

  // filter function
  applyFilter() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  OpenDeleteDialog(id: number, NAME: string) {
    Swal.fire({
      title: 'Are you sure ?',
      html: `You want to <b style="color:red">delete</b> <b style="color:blue">${NAME}</b> with ID <b style="color:blue">#${id}</b>`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.deleteImage(id).subscribe(
          (res) => {
            this.getImages();
            Swal.fire(
              'Deleted successfully',
              `Product <b style="color:blue">${NAME}</b> with ID <b style="color:blue">#${id}</b> data is deleted`,
              'success'
            );
          },
          (error) => {
            console.log('Error: ', error.message);
            Swal.fire('Access denied', 'No rights to delete', 'error');
          }
        );
      }
    });
  }

  // add product
  addProduct() {
    this.add_service
      .confirm()
      .then(() => {
        this.getImages();
      })
      .catch(() => {
        console.log('user cancelled dialog');
      });
  }

  OpenLoginDialog() {
    Swal.fire({
      title: 'Please Login to continue',
      html: `Once logged in you can access products.`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Login',
      denyButtonText: `Cancel`,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
      if (result.isDenied) {
        this.router.navigate(['/login']);
      }
    });
  }

  AccessDeniedDialog() {
    Swal.fire({
      title: 'Access denied',
      html: `You are not allowed to view this content.`,
      icon: 'error',
      showDenyButton: true,
      confirmButtonText: 'Go back',
      denyButtonText: `Cancel`,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/store']);
      }
      if (result.isDenied) {
        this.router.navigate(['/store']);
      }
    });
  }
}
