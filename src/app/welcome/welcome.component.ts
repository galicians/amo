import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { ActivatedRoute, Router } from '@angular/router';
import { IdvQuestionsService } from '../idv/idv-questions.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  locale: string;
  
  constructor( 
	  private route: ActivatedRoute,
  	translate: TranslateService) {
      route.data
        .subscribe(
          data => {
            console.log('route.data', data);
            this.locale = data['properties']['ui.locale']
          }
        );

        translate.setDefaultLang(this.locale);
        translate.use(this.locale);
    }

  ngOnInit() {
  }

}
