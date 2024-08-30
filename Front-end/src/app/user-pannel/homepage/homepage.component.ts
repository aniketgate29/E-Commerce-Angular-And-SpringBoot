import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import lozad from 'lozad';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true, // Add this line to enable auto-slide
    autoplayTimeout: 2000, // Adjust the timeout value as needed (in milliseconds)
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor() { }


  
  images: any[] = [ 
    { 
        previewImageSrc: 
'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210203171024/CSSTutorial.png', 
        thumbnailImageSrc: 
'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210203171024/CSSTutorial.png', 
        alt: 'Cascading Style Sheet', 
        title: 'CSS'
    }, 
    { 
        previewImageSrc: 
'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png', 
        thumbnailImageSrc: 
'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png', 
        alt: 'Angular for Front end', 
        title: 'Angular'
    }, 
    { 
        previewImageSrc: 
            'https://media.geeksforgeeks.org/wp-content/cdn-uploads/Java.png', 
        thumbnailImageSrc: 
            'https://media.geeksforgeeks.org/wp-content/cdn-uploads/Java.png', 
        alt: 'Java Programming Language', 
        title: 'Java'
    }, 
    { 
        previewImageSrc: 
'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png', 
        thumbnailImageSrc: 
'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png', 
        alt: 'HyperText Markup Language', 
        title: 'HTML'
    }, 
]; 
ngOnInit(): void {
  
}
}
