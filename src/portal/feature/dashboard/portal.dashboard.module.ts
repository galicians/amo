import { NgModule } from '@angular/core';
import { SharedModules } from '../../../shared/shared.module';

import { PortalDashboardComponent } from './portal.dashboard.component';
import { PortalDashNavService } from './portal.dashboard.nav.service';

@NgModule({
	declarations: [ PortalDashboardComponent ],
	imports: [ SharedModules ],
	providers: [ PortalDashNavService ]
})
export class PortalDashboardModule {}