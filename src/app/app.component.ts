import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'smartcollect';
  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }
}

