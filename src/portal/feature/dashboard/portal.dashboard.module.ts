import { NgModule } from '@angular/core';
import { SharedModules } from '../../../shared/shared.module';

import { PortalDashboardComponent } from './portal.dashboard.component';

@NgModule({
	declarations: [ PortalDashboardComponent ],
	imports: [ SharedModules ]
})
export class PortalDashboardModule {}