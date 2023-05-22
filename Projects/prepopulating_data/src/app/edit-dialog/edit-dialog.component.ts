import { Component, Inject } from '@angular/core';
import { PatientService } from '../patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  id!: number;
  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<EditDialogComponent>,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  updateForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  });

  ngOnInit() {
    this.id = this.data.id;
    console.log(this.data);
    this.updateForm.patchValue(this.data);
  }

  onSubmit() {
    this.patientService
      .updatePatientById(this.id, this.updateForm.value)
      .subscribe((res: any) => {
        alert('updated');
        this.dialog.close(true);
      });
  }
}
