import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email="sdfoodnbehaverages@gmail.com";

  isHomePage: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isHomePage = this.router.url === '/';
  }
}
