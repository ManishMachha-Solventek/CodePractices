import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private patientService: PatientService,
    private fb: FormBuilder,
    private router:Router) { }
 
    LoginForm: FormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  login() {
    this.patientService.login(this.LoginForm.value.username, this.LoginForm.value.password).subscribe({
      next: (res: any) => {
        if (res.data == true) {
          this.router.navigate(["/", "app-home"])
        }
        else {
          alert('Login failed');
        }
      }
    })
  }
}
