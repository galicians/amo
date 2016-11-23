import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AppComponent } from '../app/app.component';
import { PortalComponent } from '../portal/portal.component';

const mainRoutes: Routes = [
	{ path: 'app', component: AppComponent },
	{ path: 'portal', component: PortalComponent },
	//{ path: '', redirectTo: 'app', pathMatch: 'full'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(mainRoutes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [ RouterModule ]
})
export class MainRoutingModule {}