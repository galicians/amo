import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app/app.component';
import { PortalComponent } from '../portal/portal.component';

const mainRoutes: Routes = [
	{ path: 'app', component: AppComponent },
	{ path: 'portal', component: PortalComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(mainRoutes)
	],
	exports: [ RouterModule ]
})
export class MainRoutingModule {}