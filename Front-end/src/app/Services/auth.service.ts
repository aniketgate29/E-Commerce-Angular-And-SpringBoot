// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ServerUrl } from './ServerUrl';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ServerUrl;
  private isAdmin: boolean = false;
  private user: any;  // Property to store user data

  constructor(private http: HttpClient, private router: Router) {}

  sendOtp(mobile: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { mobile });
  }

  verifyOtp(mobile: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { mobile, otp });
  }

  resetPassword(mobile: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { mobile, password });
  }

  login(mobile: string, password: string): void {
    const body = { mobile, password };

    this.http.post<any>(`${this.apiUrl}/login`, body).subscribe({
      next: async (response) => {
        if (response.message == 'Login successful' || response.token) {
          const token = JSON.stringify(response.token);
          localStorage.setItem('token', token);
          console.log('Token:', token);
          const role = JSON.parse(token).role;
          await this.storeUserData();
     console.log(role);
          this.isAdmin = role == 'admin';
          if (this.isAdmin) {
            this.router.navigate(['/adminpanel/admin-home']);
          } else {
            
            this.router.navigate(['/user-pannel/home']);
          }
          alert('Login Successful');
          this.resetPassword(mobile, password);

        } else {
          alert('Login Failed: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  getUser(mobile: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${mobile}`);
  }

  private async storeUserData(): Promise<void> {
    try {
      const token = JSON.parse(localStorage.getItem('token') || '{}');
      const mobile = token.mobile || token['mobile'];
      if (mobile) {
        this.user = await this.getUser(mobile.toString()).toPromise();
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  getUserData(): any {
    this.storeUserData();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.user;
  }



  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
