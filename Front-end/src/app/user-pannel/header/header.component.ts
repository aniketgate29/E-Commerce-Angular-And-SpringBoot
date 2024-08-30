import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isHome: boolean = false;
  isAbout: boolean = false;
  isContact: boolean = false;
  isCart: boolean = false;
  isLogout: boolean = false;
  isProfile: boolean = false;

  
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to router events to determine active route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute(event.url);
      }
    });
  }

  // Function to check active route and set corresponding boolean values
  checkActiveRoute(url: string): void {
    this.isHome = url === '/';
    this.isAbout = url === '/about';
    this.isContact = url === '/contact';
    this.isCart = url === '/cart';
    this.isLogout = url === '/logout';
    this.isProfile = url === '/profile';
  }

  // Function to logout user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
