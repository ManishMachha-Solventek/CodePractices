import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  genderChecked: boolean = true;

  personalDetailsForm: FormGroup = this.fb.group({
    firstname: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    lastname: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    age: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.max(9999999999),
        Validators.min(1000000000),
      ],
    ],
    aadhar: [
      '',
      [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
        Validators.pattern(/^[0-9]*$/),
      ],
    ],
    pan: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/),
      ],
    ],
    gender: ['', [Validators.required]],
  });

  submitForm() {
    sessionStorage.setItem(
      'personal-details',
      JSON.stringify(this.personalDetailsForm.value)
    );
    window.location.replace('address');
  }

  ngOnInit() {
    // if (sessionStorage.getItem('personal-details')) {
    //   this.personalDetailsForm.setValue(
    //     JSON.parse(sessionStorage.getItem('personal-details') || '{}')
    //   );
    // }

    this.genderCheck();
  }

  genderCheck() {
    console.log(this.personalDetailsForm.get('gender')!.value);
    if (this.personalDetailsForm.value.gender != '') {
      this.genderChecked = false;
    }else{
      this.genderChecked = true;
    }
  }
}
