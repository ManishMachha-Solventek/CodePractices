import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'gender',
    'age',
    'phone',
    'email',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.getPatientList();
  }

  openEdit(patient: any) {
    let dialog = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: patient,
    });

    dialog.afterClosed().subscribe((res: any) => {
      if (res == true) {
        this.getPatientList();
      }
    });
  }

  openDelete(patient: any) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '260px',
      data: patient,
    });

    dialog.afterClosed().subscribe((res: any) => {
      if (res == true) {
        this.getPatientList();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPatientList() {
    this.patientService.getPatientList().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  prepopulate() {
    this.patientService.prepopulate().subscribe((res: any) => {
      this.getPatientList();
    });
  }

  deleteAll() {
    this.patientService.deleteAll().subscribe((res: any) => {
      this.getPatientList();
    });
  }
}
