import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditOverlayService } from '../edit-overlay.service';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent {
  images: any;
  selectedFiles: any;
  currentFile: File;
  search: any;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'name', 'image', 'edit', 'delete'];

  constructor(
    private service: ImagesService,
    private _liveAnnouncer: LiveAnnouncer,
    private editOverlayService: EditOverlayService
  ) {}

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.service.getImages().subscribe((data: any) => {
      this.images = data.map(this.convertImage);

      console.log(data);
      this.dataSource = new MatTableDataSource<any>(this.images);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

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

  deleteImage(id: any) {
    this.service.deleteImage(id).subscribe(() => {
      this.getImages();
    });
  }

  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      image: 'data:image/jpg;base64,' + data.image,
    };
  }

  applyFilter() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }
}
