import { Component } from '@angular/core';

@Component({
	selector: 'main-root',
	template: ` 
		<router-outlet flex></router-outlet>
	`,
	styleUrls: [ './main.component.css' ]

})
export class MainComponent {}

