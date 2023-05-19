import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mystatus: any = 0
  submitted = false;
  constructor(private patient: PatientService, private fb: FormBuilder) { }


  patientsaveform: FormGroup = this.fb.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]]
  })

  ngOnInit() {
  }

  registered() {
    console.log(this.patientsaveform.value);
    
    this.patient.savePatient(this.patientsaveform.value).subscribe((res) => {
      this.mystatus = res.status
    })
    this.patientsaveform.reset();
  }

  get fname(): FormControl {
    return this.patientsaveform.get("fname") as FormControl;
  }
  get lname(): FormControl {
    return this.patientsaveform.get("lname") as FormControl;
  }
  get email(): FormControl {
    return this.patientsaveform.get("email") as FormControl;
  }
  get age(): FormControl {
    return this.patientsaveform.get("age") as FormControl;
  }
  get Phone(): FormControl {
    return this.patientsaveform.get("phone") as FormControl;
  }
  get Gender(): FormControl {
    return this.patientsaveform.get("gender") as FormControl;
  }
}
