/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PortalComponent } from '../portal/portal.component';
import { IdvComponent } from './idv/idv.component';
import { IdvResolver } from './idv/idv-questions.resolver';
import { JmxResolver } from './shared/jmx.resolver';

export const routes: Routes = [
	{
		path: 'app', component: AppComponent,
		children: [
			{ path: '', component: IdvComponent , resolve: { questions: IdvResolver, properties: JmxResolver }},
			{ path: 'portal', component: PortalComponent }
		]

	},
	{ path: '**', redirectTo: 'app', pathMatch: 'full'}
    //{ path: 'welcome', component: WelcomeComponent },
    //{ path: '**', redirectTo: '', pathMatch: 'full'}
];
