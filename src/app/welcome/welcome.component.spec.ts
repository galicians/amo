/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Pipe, PipeTransform,
    NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { TranslateService } from 'ng2-translate';
import { Store } from '@ngrx/store';

// import { APP_JMX_PROPS } from '../shared/reducers/app.constants';

let comp: WelcomeComponent;
let fixture: ComponentFixture<WelcomeComponent>;
let de: DebugElement;
let el: HTMLElement;

let APP_JMX_PROPS = {};

let locale: string = 'dex';


/*
 * Translate pipe mock
 */
@Pipe({ name: 'translate', pure: false })
export class MockTranslatePipe implements PipeTransform {
    name: string = 'translate';
    transform(value) {
        return value;
    }
}

/*
 * TranslateService stub
 */
let translateServiceStub = {
    info: 'Translate test stub'
};

/*
 * Store stub
 */
 let storeServiceStub = {
     info: 'Store test stub'
 };



describe('Component: Welcome', () => {

  beforeEach( () => {
      TestBed.configureTestingModule({
          declarations: [ WelcomeComponent, MockTranslatePipe ],
          schemas:      [ NO_ERRORS_SCHEMA ],
          providers: [
              { provide: ComponentFixtureAutoDetect, useValue: true },
              { provide: TranslateService, useValue: translateServiceStub },
              { provide: Store, useValue: storeServiceStub }
            ]
      });

      fixture = TestBed.createComponent( WelcomeComponent );
      comp = fixture.componentInstance;
  });

  it('should set the locale to EN-GB', () => {
    // expect(comp.locale).toEqual('dexter');
  });

  it('should have JMX properties available', () => {
      /* APP_JMX_PROPS = Object.assign(APP_JMX_PROPS, {
          'ui.displayIE': true,
          'ui.isIEMandatory': true
      });
      expect(APP_JMX_PROPS).toBeDefined();
      expect(APP_JMX_PROPS).toEqual(jasmine.objectContaining({
          'ui.isIEMandatory': true
      }));
      expect(APP_JMX_PROPS).not.toEqual(jasmine.objectContaining({
          'c': 37
      })); */
  });


  describe('IE: Mandatory(no I&E completed)', () => {
      /* APP_JMX_PROPS = Object.assign(APP_JMX_PROPS, {
          'ui.displayIE': true,
          'ui.isIEMandatory': true
      }); */

      it('should have ieIsNull is true', () => {

      });

      it('should have uiIsIEMandatory is true', () => {

      });

      it('should have uiDisplayIE is true', () => {

      });
  });


});

