import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerUrl } from '../../Services/ServerUrl';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private apiUrl = ServerUrl;

  Areas: any[] = [];
  registrationData: any = {
    first_name: '',
    last_name: '',
    sociaty_name: '',
    flat_no: '',
    wing_name: '',
    area: '',
    email: '',
    mobile: '',
    password: '',
    confirmpassword: ''
  };

  ngOnInit(): void { }

  constructor(private http: HttpClient, private router: Router) {
    this.getAreas();
  }

  isPasswordsMatching(): boolean {
    return this.registrationData.password === this.registrationData.confirmpassword;
  }

  getAreas() {
    this.http.get<any[]>(`${this.apiUrl}/areas`).subscribe(data => {
      this.Areas = data;
    });
  }

  registerUser() {
    // Check if password and confirm password match
 

    // Prepare the data to be sent to the backend
    const userData = {
      area: this.registrationData.area,
      email: this.registrationData.email,
      first_name: this.registrationData.first_name,
      flat_no: this.registrationData.flat_no,
      last_name: this.registrationData.last_name,
      mobile: this.registrationData.mobile,
      password: this.registrationData.password,
      sociaty_name: this.registrationData.sociaty_name,
      wing_name: this.registrationData.wing_name
    };

    this.http.post(`${this.apiUrl}/users`, userData)
      .subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']); 
        },
        error => {
          console.error('Error occurred during registration', error);
          alert('Registration failed: ' + error.error.message);
        }
      );
  }
}
