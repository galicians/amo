import { NgModule } from '@angular/core';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal.routing.module';

@NgModule({
	declarations: [ PortalComponent ],
	imports: [
		PortalRoutingModule
	]
})
export class PortalModule {}