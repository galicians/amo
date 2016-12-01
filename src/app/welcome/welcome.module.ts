import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { WelcomeComponent } from './welcome.component';
import { WelcomeHeadInfoComponent } from './feature/welcome.headInfo.component';
import { WelcomeOverviewComponent } from './feature/welcome.overview.component';
import { WelcomeDescriptionComponent } from './feature/welcome.description.component';
import { WelcomeIEButtonsComponent } from './feature/welcome.ie.buttons.component';
import { TranslateModule } from 'ng2-translate';
import { UserOverviewModule } from '../user-overview-panel/user.overview.module';
import { StepsPanelModule } from '../steps-panel/steps.panel.module';
// import { JMXservice } from '../shared/jmx.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HttpModule,
    UserOverviewModule,
    StepsPanelModule
  ],
  declarations: [ WelcomeComponent, WelcomeHeadInfoComponent, WelcomeOverviewComponent, WelcomeDescriptionComponent, WelcomeIEButtonsComponent],
  providers: [ HttpModule ],
  exports: [ TranslateModule ]
})
export class WelcomeModule { }
