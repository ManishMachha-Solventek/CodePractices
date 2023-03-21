import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})
export class CareerComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  isPreviousFilled: boolean = false;

  ngOnInit() {
    if (sessionStorage.getItem('education')) {
      this.isPreviousFilled = true;
    } else {
      this.isPreviousFilled = false;
      alert('Please fill education details to access career form');
      window.location.replace('education');
    }

    // if (sessionStorage.getItem('career')) {
    //   this.careerForm.setValue(JSON.parse(sessionStorage.getItem('career') || '{}'));
    // }
  }

  careerForm: FormGroup = this.fb.group({
    org1: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ],
    ],
    role1: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ],
    ],
    org2: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ],
    ],
    role2: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ],
    ],
    org3: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ],
    ],
    role3: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(30),
        Validators.minLength(2),
      ],
    ],
  });

  submitForm() {
    sessionStorage.setItem('career', JSON.stringify(this.careerForm.value));
    window.location.replace('confirmation');
  }
}
