import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
	selector: 'portal-auth-panel',
	templateUrl: './portal.auth.panel.component.html'
})

export class PortalAuthPanelComponent {
	@Input() people;
	@Output() addPerson = new EventEmitter();

	add( personInput ) {
		this.addPerson.emit( personInput );
	}
}