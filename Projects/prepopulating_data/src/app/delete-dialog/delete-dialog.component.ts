import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  constructor(
    private dialog: MatDialogRef<DeleteDialogComponent>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  id!: number;

  ngOnInit() {
    this.id = this.data.id;
  }

  delete() {
    this.patientService.deletePatient(this.id).subscribe((res: any) => {
      this.dialog.close(true);
    });
  }
}
