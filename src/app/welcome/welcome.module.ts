import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeHeadInfoComponent } from './feature/headInfo/welcome.headInfo.component';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [WelcomeComponent, WelcomeHeadInfoComponent],
  exports: [ TranslateModule ]
})
export class WelcomeModule { }
