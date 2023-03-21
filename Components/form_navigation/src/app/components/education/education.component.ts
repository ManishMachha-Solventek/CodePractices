import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  isPreviousFilled: boolean = false;

  ngOnInit() {
    if (sessionStorage.getItem('address')) {
      this.isPreviousFilled = true;
    } else {
      this.isPreviousFilled = false;
      alert('Please fill address details to access education form');
      window.location.replace('address');
    }

    // if (sessionStorage.getItem('education')) {
    //   this.educationForm.setValue(JSON.parse(sessionStorage.getItem('education') || '{}'));
    // }
  }

  educationForm: FormGroup = this.fb.group({
    secondaryInstitute: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    highSchoolInstitute: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    graduationInstitute: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ],
    ],
    secondaryGPA: [
      '',
      [Validators.required, Validators.min(0), Validators.max(10)],
    ],
    highSchoolGPA: [
      '',
      [Validators.required, Validators.min(0), Validators.max(10)],
    ],
    graduationGPA: [
      '',
      [Validators.required, Validators.min(0), Validators.max(10)],
    ],
  });

  submitForm() {
    sessionStorage.setItem(
      'education',
      JSON.stringify(this.educationForm.value)
    );
    window.location.replace('career');
  }
}
