import { NgModule } from '@angular/core';
import { SharedModules } from '../../../shared/shared.module';

import { PortalAuthComponent } from './portal.auth.component';

@NgModule({
	declarations: [ PortalAuthComponent ],
	imports: [
		SharedModules
	]
})
export class PortalAuthModule {}