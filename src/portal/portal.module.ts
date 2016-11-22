import { NgModule } from '@angular/core';

import { PortalComponent } from './portal.component';
import { PortalAuthModule } from './feature/auth/portal.auth.module';
import { PortalDashboardModule } from './feature/dashboard/portal.dashboard.module';
import { PortalRoutingModule } from './portal.routing.module';


@NgModule({
	declarations: [ PortalComponent ],
	imports: [
		PortalRoutingModule, PortalAuthModule, PortalDashboardModule
	]
})
export class PortalModule {}