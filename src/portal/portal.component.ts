import { Component } from '@angular/core';

@Component({
	//selector: 'portal-comp',
	template: `
		<h2>The portal comp.</h2>
		<router-outlet></router-outlet>
	`,
	//templateUrl: './portal.component.html',
	styleUrls: [ './portal.component.css' ]
})
export class PortalComponent {}