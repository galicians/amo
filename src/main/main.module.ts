import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModules } from '../shared/shared.module';
import { MainRoutingModule } from './main.routing.module';
import { AppModule } from '../app/app.module';
import { PortalModule } from '../portal/portal.module';
import { MainComponent } from './main.component';

@NgModule({
	declarations: [ MainComponent ],
	imports: [ BrowserModule, MainRoutingModule, 
				AppModule, PortalModule, 
				SharedModules ],
	bootstrap: [ MainComponent ]
})
export class MainModule {}