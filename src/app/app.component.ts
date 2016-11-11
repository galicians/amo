import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [`.basic {
  	background: red;
  }`],

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

