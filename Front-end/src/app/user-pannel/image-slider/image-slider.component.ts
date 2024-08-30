import { Component } from '@angular/core';

interface Review {
  imageUrl: string;
  altText: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  reviews: Review[] = [
    { imageUrl: './assets/Image/r1.jpeg', altText: 'Review 1' },
    { imageUrl: './assets/Image/r2.jpeg', altText: 'Review 2' },
    { imageUrl: './assets/Image/r3.jpeg', altText: 'Review 3' },
    { imageUrl: './assets/Image/r4.jpeg', altText: 'Review 4' },
    { imageUrl: './assets/Image/r5.jpeg', altText: 'Review 5' },
    { imageUrl: './assets/Image/r6.jpeg', altText: 'Review 6' },
    { imageUrl: './assets/Image/r7.jpeg', altText: 'Review 7' },
    { imageUrl: './assets/Image/r8.jpeg', altText: 'Review 8' },
    { imageUrl: './assets/Image/r9.jpeg', altText: 'Review 9' },
    { imageUrl: './assets/Image/r10.jpeg', altText: 'Review 10' }
    
    // Add more review objects as needed
  ];
  currentReviewIndex = 0;

  prevReview() {
    this.currentReviewIndex = (this.currentReviewIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  nextReview() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
    if (this.currentReviewIndex === 0) {
      // If reached the last image, loop back to the first image
      this.currentReviewIndex = 0;
    }
  }
  

  selectReview(index: number) {
    this.currentReviewIndex = index;
  }
}
