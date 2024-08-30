import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {
  mobileNumber: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mobileNumber = params['mobile'];
    });
  }

  setNewPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.authService.resetPassword(this.mobileNumber, this.newPassword).subscribe(
        () => {
          alert('Password successfully changed');
          this.router.navigate(['/login']); // Navigate to login or another page as needed
        },
        error => {
          console.error('Error resetting password', error);
        }
      );
    } else {
      alert('Passwords do not match');
    }
  }
}
