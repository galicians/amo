import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { WelcomeComponent } from './welcome.component';
import { WelcomeHeadInfoComponent } from './feature/headInfo/welcome.headInfo.component';
import { TranslateModule } from 'ng2-translate';
// import { JMXservice } from '../shared/jmx.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HttpModule
  ],
  declarations: [WelcomeComponent, WelcomeHeadInfoComponent],
  providers: [ HttpModule ],
  exports: [ TranslateModule ]
})
export class WelcomeModule { }
