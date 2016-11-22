import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartcollect';
  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
      console.log( 'APPCOMPONENT CREATED!' );
  }
}

