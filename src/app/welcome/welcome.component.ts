import { Component, OnInit } from '@angular/core';
import { JMXservice } from '../shared/jmx.service';
import { TranslateService } from 'ng2-translate';
import { ActivatedRoute } from '@angular/router';

import { UserOverviewComponent } from '../user-overview-panel/user.overview.component';
// import 'rxjs/add/operator/map';
// import { Store } from '@ngrx/store';

// import { IE_DISPLAY, IE_HIDE } from '../shared/reducers/app.ui.displayIE.reducer';

@Component({
  selector: 'app-welcome',
  providers: [ JMXservice ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  uiProps;
  uiLocale;
  ieIsNull;
  uiDisplayIE;
  uiIsIEMandatory;
  ieForms;

  constructor(
    private route: ActivatedRoute,
    translate: TranslateService,
    /*private _store: Store<any>*/
    jmxService: JMXservice) {

      // console.log('_store: ', _store);

      this.uiProps = Object.assign({}, jmxService.getLocalJMXproperties() );
      this.uiLocale = this.uiProps['ui.locale'];

      if ( this.uiLocale ) {
        let str = this.uiLocale;
        this.uiLocale = str.substr(1, 5);
      }
      
      this.uiIsIEMandatory = this.uiProps['ui.isIEMandatory'];
      this.uiDisplayIE = this.uiProps['ui.displayIE'];
      this.ieIsNull = true;
      this.ieForms = [];

      /*
      _store.select('uiDisplayIEreducer')
        .subscribe( uiDisplayIE => {
          if(this.uiDisplayIE == {}){
            this.noProperties();
          }
          this.propertiesLoaded();
          this.uiDisplayIE = uiDisplayIE;
      });
      */

      /*
      route.data
        .subscribe(
          data => {
            console.log('route.data', data);
            this.locale = data['properties']['ui.locale'];
            this.locale = this.locale.substr(1,5);
            this.routeUiDisplayIE = data['properties']['ui.displayIE'];
          }
        );
      */


       translate.setDefaultLang(this.uiLocale);
       translate.use(this.uiLocale);

  }

  ngOnInit() {
  }

  /*
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
  */


}
