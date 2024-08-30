import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  isHome: boolean = false;
  isAbout: boolean = false;
  isContact: boolean = false;
  isCart: boolean = false;
  isLogout: boolean = false;
  isAdmin: boolean = false;
  isArea: boolean = false; // New option for Area
isUsers: boolean = false;
isCategory: boolean = false;

  constructor(private router: Router) { }

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
    this.isAdmin = url === '/admin';
    this.isArea = url === '/area'; // Check for the Area route
    this.isUsers = url === '/users'; // Check for the Area route
    this.isCategory = url === '/category';
  }
}
