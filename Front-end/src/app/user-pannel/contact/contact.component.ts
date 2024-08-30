import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name: string='';
  phoneNumber: string='';
  email: string='';
  message: string ='';

 

  sendMessage() {
    // Here you can implement the logic to send the message
    console.log('Sending message:', this.message);
    // You can add your HTTP request or any other logic here
  }
}
