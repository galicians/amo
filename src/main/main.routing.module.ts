import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { JmxResolver } from '../app/shared/jmx.resolver';
import { AppComponent } from '../app/app.component';
import { PortalComponent } from '../portal/portal.component';


const mainRoutes: Routes = [
	//{ path: 'app', component: AppComponent },
	//{ path: 'portal', component: PortalComponent },
	{ path: '', redirectTo: 'app/idv', pathMatch: 'full', resolve: { properties: JmxResolver }},
	{ path: 'app', redirectTo: 'app/idv', pathMatch: 'full', resolve: { properties: JmxResolver }},
	{ path: 'portal', redirectTo: 'portal/auth', pathMatch: 'full'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(mainRoutes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [ RouterModule ]
})
export class MainRoutingModule {}