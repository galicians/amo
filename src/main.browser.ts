import './polyfills.browser';
import './rxjs.imports';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
//import { AppModule } from './app/app.module';
import { decorateModuleRef } from './environment';

import { MainModule } from './main/main.module';
import { ServiceWorkActivate } from './service-work-active';

if ('production' === ENV) {
  enableProdMode();
}

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(MainModule)
    .then(decorateModuleRef)
    .catch(err => console.error('Bootstrapping error', err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);

new ServiceWorkActivate();