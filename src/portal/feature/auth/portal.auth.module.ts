import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModules } from '../../../shared/shared.module';

import { PortalAuthComponent } from './portal.auth.component';

@NgModule({
	declarations: [ PortalAuthComponent ],
	imports: [
		SharedModules,
		FormsModule
	]
})
export class PortalAuthModule {}