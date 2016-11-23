import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IdvComponent } from './idv/idv.component';
import { IdvResolver } from './idv/idv-questions.resolver';
import { JmxResolver } from './shared/jmx.resolver';

const appRoutes: Routes = [
	{
		path: 'app', 
		component: AppComponent,
		children: [
			{ path: 'idv', component: IdvComponent , resolve: { questions: IdvResolver, properties: JmxResolver }},
			{ path: 'welcome', component: WelcomeComponent },
			{ path: '', redirectTo: '/idv', pathMatch: 'full'}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(appRoutes)
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
