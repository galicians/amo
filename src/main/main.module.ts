import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { SharedModules } from '../shared/shared.module';
import { MainRoutingModule } from './main.routing.module';
import { AppModule } from '../app/app.module';
import { PortalModule } from '../portal/portal.module';
import { MainComponent } from './main.component';

import { portalUsers } from '../portal/portal.user.reducer';

@NgModule({
	declarations: [ MainComponent ],
	imports: [ BrowserModule, MainRoutingModule, 
				AppModule, PortalModule, 
				SharedModules,
				StoreModule.provideStore({ portalUsers }) ],
	bootstrap: [ MainComponent ]
})
export class MainModule {}