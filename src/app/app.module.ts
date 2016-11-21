/** 
 * This module is the entry for your App when NOT using universal.
 * 
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.  
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { APP_IMPORTS } from './app.imports';


import { AppComponent } from './app.component';
import { IdvModule } from './idv/idv.module';
import { WelcomeModule } from './welcome/welcome.module';
import { PortalModule } from '../portal/portal.module';


import { IdvResolver } from './idv/idv-questions.resolver';
import { JmxResolver } from './shared/jmx.resolver';
import { IdvQuestionsService } from './idv/idv-questions.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


// import { IDVRoutingModule } from './app-routing.module';
// import { IdvQuestionsService } from "./idv/idv-questions.service";
// import { RouterOutletStub } from './app.router-stubs';

export function translateLoaderFactory(http: any) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  // specifies the components defined in this module
  // ** you have to declare components in a NgModule before you can use them in your templates **
  // Every component must be declared in some NgModule.
  // when I've declared IdvComponent at idv.module declarations, the webcomponent wasn't displaying
  // every component can belong to only one NgModule
  declarations: [
    AppComponent,
    // RouterOutletStub
    // WelcomeComponent
  ],
  // list of the dependencies this modules has
  imports: [
    APP_IMPORTS,
    BrowserModule,
    FormsModule,
    HttpModule,

    IdvModule,
    WelcomeModule,
    PortalModule,

    // the forRoot and the options should be always in this file app.module.ts
    TranslateModule.forRoot({
      provide: TranslateLoader,
      // useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      useFactory: translateLoaderFactory,
      deps: [Http]
    })
  ],
  // Exports is the list of public components for this NgModule
  // If you forget to put your component in both declarations and 
  // exports(and then try to use it in another module via
  // imports, it won't work.
  exports: [],
  // schemas: [ 'CUSTOM_ELEMENTS_SCHEMA' ],
  // injectable objects that are available in the injector of this module, and therefore can be used
  // on the components of this module
  providers: [IdvResolver, IdvQuestionsService, JmxResolver],
  // When we use this module to bootstrap an app, AppComponent should be bootstrapped
  bootstrap: [ AppComponent ]
})
export class AppModule { }
