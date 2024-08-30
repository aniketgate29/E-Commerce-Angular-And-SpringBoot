import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-verifymobile',
  templateUrl: './verifymobile.component.html',
  styleUrls: ['./verifymobile.component.css']
})
export class VerifymobileComponent {
  mobile: string = '';
  otp: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  sendOtp() {
    this.authService.sendOtp(this.mobile).subscribe(
      () => {
        console.log('OTP sent successfully');
      },
      error => {
        console.error('Error sending OTP', error);
      }
    );
  }

  verifyOtp() {
    this.authService.verifyOtp(this.mobile, this.otp).subscribe(
      () => {
        this.router.navigate(['/set-password'], { queryParams: { mobile: this.mobile } });
      },
      error => {
        alert('Invalid OTP');
        console.error('Error verifying OTP', error);
      }
    );
  }

}
