import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalComponent } from './portal.component';
import { PortalAuthComponent } from './feature/auth/portal.auth.component';
import { PortalDashboardComponent } from './feature/dashboard/portal.dashboard.component';


const portalRoutes: Routes = [
	{ path: 'portal', 
	component: PortalComponent,
	children: [
	 	{ path: 'auth', component: PortalAuthComponent },
	 	{ path: 'dashboard', component: PortalDashboardComponent }
	]
	},
	//{ path: 'auth', loadChildren: './feature/auth/portal.auth.module#PortalAuthModule' },
	//{ path: 'dashboard', loadChildren: './feature/dashboard/portal.dashboard.module#PortalDashboardModule' }
	//{ path: '**', redirectTo: 'portal', pathMatch: 'prefix'}
	
];

@NgModule({
	imports: [
		RouterModule.forChild(portalRoutes)
	],
	exports: [ RouterModule ]
})
export class PortalRoutingModule {}