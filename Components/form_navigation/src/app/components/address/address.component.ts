import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}

  isPreviousFilled: boolean = false;

  ngOnInit() {
    if (sessionStorage.getItem('personal-details')) {
      this.isPreviousFilled = true;
    } else {
      this.isPreviousFilled = false;
      alert('Please fill personal details to access address form');
      window.location.replace('personal-details');
    }

    // if (sessionStorage.getItem('address')) {
    //   this.addressForm.setValue(
    //     JSON.parse(sessionStorage.getItem('address') || '{}')
    //   );
    // }
  }

  addressForm: FormGroup = this.fb.group({
    area: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    city: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    district: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    state: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    houseno: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(1)],
    ],
    pin: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(/^([1-9])([0-9]){5}$/),
      ],
    ],
  });

  submitForm() {
    sessionStorage.setItem('address', JSON.stringify(this.addressForm.value));
    window.location.replace('education');
  }
}
