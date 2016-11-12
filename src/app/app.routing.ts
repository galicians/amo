/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { IdvComponent } from './idv/idv.component';
import { IdvResolver } from './idv/idv-questions.resolver';
import { JmxResolver } from './shared/jmx.resolver';

export const routes: Routes = [
    { path: '', component: IdvComponent , resolve: { questions: IdvResolver, properties: JmxResolver }},
    { path: 'welcome', component: WelcomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
