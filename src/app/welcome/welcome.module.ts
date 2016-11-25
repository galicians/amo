import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { TranslateModule } from 'ng2-translate';

// const welcomeRouting: ModuleWithProviders = RouterModule.forChild([
//   {
//     path: 'welcome',
//     component: WelcomeComponent
//   }
// ])


@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [WelcomeComponent],
  exports: [ TranslateModule ]
})
export class WelcomeModule { }
