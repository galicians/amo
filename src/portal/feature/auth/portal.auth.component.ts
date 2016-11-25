import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

//import { PortalState } from './portal.state.interface';
import { PortalComponent } from '../../portal.component';
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
	public id: number;
	private subscription;

	constructor( private _store: Store<any> ) {
		this.subscription = _store
		.select('portalUsers')
		.subscribe(portalUsers => {
			this.users = portalUsers;
		})
		this.user;
		this.id = 0;

	}

	userLoggedIn( curruser ) {
		this._store.dispatch({
			type: "PORTAL_LOG_IN",
			payload: {
				userid: ++this.id,
				user: curruser,
				isLoggedIn: true
			}
		});
		this.user = '';
		console.log('IN:', this.users, this._store);
	}

	userLoggedOut() {
		this._store.dispatch({
			type: "PORTAL_LOG_OUT",
			payload: {
				user: 'empty',
				isLoggedIn: false
			}
		});
		console.log('OUT:', this.users, this._store);
	}

	ngOnDestroy(){
      this.subscription.unsubscribe();
    }
	
}