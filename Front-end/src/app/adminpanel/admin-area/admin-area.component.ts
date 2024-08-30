import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerUrl } from '../../Services/ServerUrl';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent {
  areaName: string = ''; // Variable to store new area name
  areas: any[] = []; // Array to store added areas
  private apiUrl = ServerUrl;

  constructor(private http:HttpClient,private router:Router ) { 
    this.getAllArea();
  }
  
  async getAllArea(){ 
    const data = await this.http.get<any[]>(`${this.apiUrl}/areas`).toPromise();
    this.areas=data || [];
    console.log(this.areas);
  }
  
  async addArea(){
    const area = {name:this.areaName};
    const res = await this.http.post(`${this.apiUrl}/areas`, area).toPromise();
    this.areaName='';
    alert("area is added");
    this.getAllArea();
  }
  

  async deleteArea(area:any): Promise<void> {
    const index = this.areas.indexOf(area);
    this.areas.splice(index, 1);
    await this.http.delete(`${this.apiUrl}/areas/${area.area_id}`).toPromise();
    alert("Area deleted successfully");
    this.getAllArea();
  }


}

