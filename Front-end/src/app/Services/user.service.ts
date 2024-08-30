import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerUrl } from './ServerUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = ServerUrl;

  constructor(private http: HttpClient) { }

  getTotalUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getLastRegistration(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/last-registration`);
  }

  getNewRegistrationsToday(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/new-registrations-today`);
  }

  getTotalRegistrationsThisWeek(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/total-registrations-this-week`);
  }
}