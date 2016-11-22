import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { PortalAuthComponent } from './portal.auth.component';

@NgModule({
	declarations: [ PortalAuthComponent ],
	imports: [
		MaterialModule.forRoot()
	]
})
export class PortalAuthModule {}