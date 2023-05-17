import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FormArray Example in Angular Reactive forms';

  data = {
    name: 'Manish',
    skills: [
      { skill: 'java', exp: 1 },
      { skill: 'php', exp: 3 },
      { skill: 'css', exp: 2 },
      { skill: null, exp: null },
    ],
  };

  skillsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.skillsForm = this.fb.group({
      name: ['', [Validators.required]],
      skills: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.skillsForm.patchValue({
      name: this.data.name,
    });

    for (let i = 0; i < this.data.skills.length; i++) {
      if (
        this.data.skills[i].skill !== null &&
        this.data.skills[i].exp !== null
      ) {
        this.addSkill(this.data.skills[i].skill!, this.data.skills[i].exp!);
      }
    }
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  newSkill(skill?: string, exp?: number): FormGroup {
    return this.fb.group({
      skill: [skill, [Validators.required]],
      exp: [exp, [Validators.required]],
    });
  }

  addSkill(skill?: string, exp?: number) {
    this.skills.push(this.newSkill(skill, exp));
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  onSubmit() {
    alert(JSON.stringify(this.skillsForm.value));
  }
}
