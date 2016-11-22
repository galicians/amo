import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalAuthComponent } from './feature/auth/portal.auth.component';
import { PortalDashboardComponent } from './feature/dashboard/portal.dashboard.component';


const portalRoutes: Routes = [
	{ path: 'auth', component: PortalAuthComponent },
	{ path: 'dashboard', component: PortalDashboardComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(portalRoutes)
	],
	exports: [ RouterModule ]
})
export class PortalRoutingModule {}