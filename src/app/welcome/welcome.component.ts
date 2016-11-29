import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { ActivatedRoute, Router } from '@angular/router';
import { IdvQuestionsService } from '../idv/idv-questions.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { IE_DISPLAY, IE_HIDE } from '../shared/reducers/app.ui.displayIE.reducer';
import { APP_JMX_PROPS, APP_PROPERTIES_LOADED, APP_PROPERTIES_NOT_LOADED } from '../shared/reducers/app.constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  locale: string;
  uiDisplayIE;
  uiIsIEmandatory;
  routeUiDisplayIE;
  
  constructor( 
	  private route: ActivatedRoute,
  	translate: TranslateService, 
    private _store: Store<any>) {
      
      console.log('_store: ', _store);
      _store.select('uiDisplayIEreducer')
        .subscribe( uiDisplayIE => {
          if(this.uiDisplayIE == {}){
            this.noProperties();
          }
          this.propertiesLoaded();
          this.uiDisplayIE = uiDisplayIE;

          
      });

      route.data
        .subscribe(
          data => {
            console.log('route.data', data);
            this.locale = data['properties']['ui.locale'];
            this.locale = this.locale.substr(1,5);
            this.routeUiDisplayIE = data['properties']['ui.displayIE'];
          }
        );

        

        translate.setDefaultLang(this.locale);
        translate.use(this.locale);

        

        console.log('this.uiDisplayIE: ', this.uiDisplayIE);
  }

  ngOnInit() {
  }

  ieDisplay() {
    this._store.dispatch({ type: IE_DISPLAY });
    console.log( 'display: ', this._store, this.uiDisplayIE);
  }

  ieHide() {
    this._store.dispatch({ type: IE_HIDE });
    console.log( 'hide: ', this._store, this.uiDisplayIE);
  }

  noProperties() {
    this._store.dispatch({ type: APP_PROPERTIES_NOT_LOADED });
    console.log('props not loaded: ', this._store);
  }

  propertiesLoaded() {
    this._store.dispatch({ type: APP_PROPERTIES_LOADED });
    console.log('props loaded: ', this._store);
  }



}
