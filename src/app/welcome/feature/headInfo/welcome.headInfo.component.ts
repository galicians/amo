import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
	selector: 'welcome-head-info',
	template: `
		<button (click)="ieDisplay.emit()">Display</button>
		<div>IE is now : {{ uiDisplayIE | json }}</div>
		<button (click)="ieHide.emit()">Hide</button>

		<div *ngIf="uiDisplayIE['ui.displayIE']">
			<p>Peeka boo!</p>
		</div>
	`
})
export class WelcomeHeadInfoComponent {
	@Input() uiDisplayIE;
	@Output() ieDisplay = new EventEmitter();
	@Output() ieHide = new EventEmitter();

	constructor() {
		console.log( 'uiDisplayIE: ', this.uiDisplayIE );
	}


}