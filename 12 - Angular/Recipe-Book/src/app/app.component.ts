import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Recipe-Book';
  loadedFeature='recipe';
  onNavigate(feature:string){
    this.loadedFeature=feature;
    console.log(feature);
  }
}
