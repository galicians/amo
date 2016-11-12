import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';

// const welcomeRouting: ModuleWithProviders = RouterModule.forChild([
//   {
//     path: 'welcome',
//     component: WelcomeComponent
//   }
// ])


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
