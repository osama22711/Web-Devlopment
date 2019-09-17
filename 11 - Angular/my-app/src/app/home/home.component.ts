import { Component, OnInit } from '@angular/core';
import {Meta , Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clickCounter: number=0;
  name:string ="hey";
  constructor(private titleService: Title,
    private meta: Meta) { 
      this.titleService.setTitle('Angular Test 1');
    }

  ngOnInit() {
  }
  countClick(){
    this.clickCounter += 1;
  }
  setClasses(){
    let myClasses={
      active: this.clickCounter > 4,
      notactive: this.clickCounter <= 4,
    }
    return myClasses;
  }
}
