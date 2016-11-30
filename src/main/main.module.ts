import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpModule, Http, Jsonp, Request, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { Injector, ReflectiveInjector } from '@angular/core';
import { JMXservice } from '../app/shared/jmx.service';
import { Resolve } from '@angular/router';
import { IdvQuestionsService } from '../app/idv/idv-questions.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { MainComponent } from './main.component';
import { SharedModules } from '../shared/shared.module';
import { MainRoutingModule } from './main.routing.module';
import { AppModule } from '../app/app.module';
import { PortalModule } from '../portal/portal.module';
import { APP_JMX_PROPS } from '../app/shared/reducers/app.constants';

console.log( 'Init Main file: ' );
//import { uiDisplayIEreducer } from '../app/shared/reducers/app.ui.displayIE.reducer';
//import { portalUsers } from '../portal/portal.user.reducer';


/*
 * setting the JMX properties Before bootstrapping 
 * the Main App
 */
export function propertiesFactory( jmxservice: JMXservice, jsonp: Jsonp) {
	let jmxPromise;
	jmxservice.getJMXproperties().toPromise()
		.then( (data) => { 
			jmxPromise = data;
			Object.assign(APP_JMX_PROPS, jmxPromise);
			console.log( 'getting JMX properties before Bootstrapping: ', APP_JMX_PROPS );
		});
	return () => { };
}


@NgModule({
	declarations: [ MainComponent ],
	imports: [ BrowserModule, MainRoutingModule, 
				AppModule, PortalModule, 
				SharedModules, HttpModule
	],
	providers: [ JMXservice, {
		provide: APP_INITIALIZER, 
		useFactory: propertiesFactory,
		deps: [ JMXservice ],
		multi: true 
	}],
	bootstrap: [ MainComponent ]
})
export class MainModule {}
