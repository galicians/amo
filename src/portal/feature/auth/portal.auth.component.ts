import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { PORTAL_LOG_IN, PORTAL_LOG_OUT } from '../../portal.user.reducer';

@Component({
	selector: 'portal-auth',
	//template: 'THIS is the PORTAL AUTH COMP TEST',
	templateUrl: './portal.auth.component.html',
	styleUrls: [ './portal.auth.component.css' ]
})
export class PortalAuthComponent {
	public user: any;
	public users: any;

	constructor( private _store: Store<any> ) {
		_store.select('users')
		.subscribe(users => {
			this.users = users;
		})
		this.user;
	}

	userLoggingIn() {
		this._store.dispatch({
			type: "PORTAL_LOG_IN",
			payload: {
				userEmail: this.user,
				loggedIn: true
			}
		});
	}

	userLoggingOut() {
		this._store.dispatch({
			type: "PORTAL_LOG_OUT",
			payload: {
				userEmail: 'Empty',
				loggedIn: false
			}
		});
	}
	
}