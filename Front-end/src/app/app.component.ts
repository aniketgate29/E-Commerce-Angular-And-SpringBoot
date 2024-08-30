import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Com';
  role: string = '';

  constructor(private router: Router) {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.role = localStorage.getItem('token.role') || '';
    }
  }

  ngOnInit() {}
  /*
    setTimeout(() => {
      this.showUserPanel = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // 2000 milliseconds = 2 seconds
    }, 20000); // 20000 milliseconds = 20 seconds
  }

  login() {
    // Perform login logic here
    this.router.navigate(['/userpannel']);
  }
  */
}
