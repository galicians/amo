import { Component } from '@angular/core';

@Component({
	selector: 'main-root',
	template: `
		<h1>The main comp.</h1>
		<router-outlet></router-outlet>
	`,
	styleUrls: [ './main.component.css' ]

})
export class MainComponent {}

