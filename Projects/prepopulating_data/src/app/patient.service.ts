import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}
  private baseURL = 'http://localhost:8080/patients';

  login(username: any, password: any) {
    return this.http.get<any>(`${this.baseURL}/login/${username}/${password}`);
  }

  savePatient(patient: any) {
    const baseUrl = 'http://localhost:8080/patients';
    return this.http.post<any>(baseUrl, patient);
  }

  getPatientList() {
    return this.http.get<any>(`${this.baseURL}`);
  }

  getPatientById(id: number) {
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }

  updatePatientById(id: number, patient: any) {
    return this.http.put(`${this.baseURL}/${id}`, patient);
  }

  deletePatient(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  prepopulate() {
    return this.http.get<any>(`${this.baseURL}/prepopulate`);
  }

  deleteAll() {
    return this.http.delete<any>(`${this.baseURL}/deleteall`);
  }
}
