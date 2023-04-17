import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  Data: any[] = [
    {
      id: 1,
      name: 'manish',
      phone: '9773659667',
      gender: 'Female',
      group: 'Solventek',
    },
    {
      id: 2,
      name: 'ashish',
      phone: '8887387241',
      gender: 'Female',
      group: 'Google',
    },
    {
      id: 3,
      name: 'prafull',
      phone: '6082875404',
      gender: 'Male',
      group: 'Solventek',
    },
    {
      id: 4,
      name: 'akash',
      phone: '2772207887',
      gender: 'Female',
      group: 'Google',
    },
    {
      id: 5,
      name: 'sidhhu',
      phone: '9026209924',
      gender: 'Male',
      group: 'Solventek',
    },
    {
      id: 6,
      name: 'mukesh',
      phone: '9457072913',
      gender: 'Male',
      group: 'Google',
    },
    {
      id: 7,
      name: 'ramu',
      phone: '1564581245',
      gender: 'Female',
      group: 'HP',
    },
    {
      id: 8,
      name: 'sundar',
      phone: '5425871190',
      gender: 'Male',
      group: 'Eamia',
    },
    {
      id: 9,
      name: 'virat',
      phone: '1324713972',
      gender: 'Male',
      group: 'HP',
    },
    {
      id: 10,
      name: 'sachin',
      phone: '1824423153',
      gender: 'Female',
      group: 'HP',
    },
  ];

  constructor(private http: HttpClient) {}

  getGroups() {
    // return this.http.get('http://localhost:8080/groups');
    return of(this.Data);
  }
}
