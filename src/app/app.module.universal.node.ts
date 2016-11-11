/** 
 * This module is the entry for your App SERVER when in UNIVERSAL mode.
 * 
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.  
 */

import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';

import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

//import { APP_DECLARATIONS } from './app.declarations';
import { APP_IMPORTS } from './app.imports';
//import { APP_PROVIDERS } from './app.providers';

import { AppComponent } from './app.component';
import { IdvModule } from "./idv/idv.module";
import { WelcomeModule } from './welcome/welcome.module';
import { IdvResolver } from "./idv/idv-questions.resolver";

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


export function translateLoaderFactory(http: any) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    //APP_DECLARATIONS
  ],
  imports: [
    APP_IMPORTS,
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule,
    HttpModule,

    IdvModule,
    WelcomeModule,

    TranslateModule.forRoot({
      provide: TranslateLoader,
      //useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      useFactory: translateLoaderFactory,
      deps: [Http]
    })
  ],
  bootstrap: [AppComponent],
  providers: [IdvResolver]
})
export class AppModule { }
