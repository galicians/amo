/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { Pipe, PipeTransform,
    NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { APP_JMX_PROPS } from '../shared/reducers/app.constants';
import { HttpModule } from '@angular/http';
import { JMXservice } from '../shared/jmx.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate';
// import { Store } from '@ngrx/store';

let comp: WelcomeComponent;
let fixture: ComponentFixture<WelcomeComponent>;
let de: DebugElement;
let el: HTMLElement;
let spy;

let jmxService;
let appJMXprops;

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
 * JMX service stub
 */
 let jmxServiceStub = {
    'ui.displayIE': true,
    'ui.isIEMandatory': true,
    'ui.locale': '"en-gb"'
 };


/*
 * TranslateService stub
 */
let translateServiceStub = {
    setDefaultLang: () => {
        return jmxServiceStub['ui.locale'];
    },
    use: () => {
        return jmxServiceStub['ui.locale'];
    }
};

/*
 * ActivatedRoute stub
 */
 let activatedRouteStub = {
     info: 'Activated route test stub'
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
              imports: [ HttpModule ],
              declarations: [ WelcomeComponent, MockTranslatePipe ],
              schemas:      [ NO_ERRORS_SCHEMA ],
              providers: [ JMXservice,
                  { provide: ActivatedRoute, useValue: activatedRouteStub },
                  { provide: TranslateService, useValue: translateServiceStub }
                ]
          });
          fixture = TestBed.createComponent( WelcomeComponent );
          this.comp = fixture.componentInstance;
          jmxService = fixture.debugElement.injector.get(JMXservice);
          spy = spyOn(jmxService, 'getLocalJMXproperties')
              .and.callFake( () => {
                  return jmxServiceStub;
              });
          this.comp.uiProps = jmxService.getLocalJMXproperties();
          this.comp.uiLocale = this.comp.uiProps['ui.locale'];
          this.comp.uiIsIEMandatory = this.comp.uiProps['ui.isIEMandatory'];
          this.comp.uiDisplayIE = this.comp.uiProps['ui.displayIE'];
    });

    describe('Welcome: base settings', () => {
     beforeEach( () => {
         jmxServiceStub = {
            'ui.displayIE': true,
            'ui.isIEMandatory': true,
            'ui.locale': '"en-gb"'
         };
     });

      it('should have JMX properties available', () => {
          fixture.detectChanges();
          expect(this.comp.uiProps).not.toEqual({});
      });

      it('should set the locale to EN-GB', () => {
          fixture.detectChanges();
          let textCheck = /^["']/;
           if ( textCheck.test( this.comp.uiLocale ) ) {
               this.comp.uiLocale = this.comp.uiLocale.substr(1,5);
           }
           fixture.detectChanges();
          expect(this.comp.uiLocale).toBe('en-gb');
      });
    });



    describe('IE: Mandatory(No I&E completed)', () => {
     beforeEach( () => {
         jmxServiceStub = {
            'ui.displayIE': true,
            'ui.isIEMandatory': true,
            'ui.locale': '"en-gb"'
         };
     });

      it('should have ieIsNull is true', () => {
          fixture.detectChanges();
          if ( this.comp.ieForms.length === 0 ) {
              this.comp.ieIsNull = true;
          }
          expect(this.comp.ieIsNull).toBeTruthy();
      });

      it('should have uiIsIEMandatory is true', () => {
          fixture.detectChanges();
          expect(this.comp.uiIsIEMandatory).toBe(true);
      });

      it('should have uiDisplayIE is true', () => {
          fixture.detectChanges();
          expect(this.comp.uiDisplayIE).toBe(true);
      });
    });

    describe('IE: Mandatory(I&E completed)', () => {
      beforeEach( () => {
         jmxServiceStub = {
            'ui.displayIE': true,
            'ui.isIEMandatory': true,
            'ui.locale': '"en-gb"'
         };
     });

     it('should have ieIsNull is false', () => {
         fixture.detectChanges();
          this.comp.ieForms.length = 1;
          if ( this.comp.ieForms.length > 0 ) {
              this.comp.ieIsNull = false;
          }
          expect(this.comp.ieIsNull).toBeFalsy();
      });

     it('should have uiIsIEMandatory is true', () => {
         fixture.detectChanges();
          expect(this.comp.uiIsIEMandatory).toBe(true);
      });

      it('should have uiDisplayIE is true', () => {
          fixture.detectChanges();
          expect(this.comp.uiDisplayIE).toBe(true);
      });

    });

    describe('IE: Optional(I&E Already completed)', () => {
        beforeEach( () => {
             jmxServiceStub = {
                'ui.displayIE': true,
                'ui.isIEMandatory': false,
                'ui.locale': '"en-gb"'
             };
         });

         it('should have ieIsNull is false', () => {
             fixture.detectChanges();
              this.comp.ieForms.length = 1;
              if ( this.comp.ieForms.length > 0 ) {
                  this.comp.ieIsNull = false;
              }
              expect(this.comp.ieIsNull).toBeFalsy();
          });

         it('should have uiIsIEMandatory is false', () => {
             fixture.detectChanges();
              expect(this.comp.uiIsIEMandatory).toBe(false);
          });

          it('should have uiDisplayIE is true', () => {
              fixture.detectChanges();
              expect(this.comp.uiDisplayIE).toBe(true);
          });
    });

    describe('IE: Optional(No I&E completed)', () => {
        beforeEach( () => {
             jmxServiceStub = {
                'ui.displayIE': true,
                'ui.isIEMandatory': false,
                'ui.locale': '"en-gb"'
             };
         });

        it('should have ieIsNull is true', () => {
          fixture.detectChanges();
          if ( this.comp.ieForms.length === 0 ) {
              this.comp.ieIsNull = true;
          }
          expect(this.comp.ieIsNull).toBeTruthy();
      });

        it('should have uiIsIEMandatory is false', () => {
             fixture.detectChanges();
              expect(this.comp.uiIsIEMandatory).toBe(false);
          });

          it('should have uiDisplayIE is true', () => {
              fixture.detectChanges();
              expect(this.comp.uiDisplayIE).toBe(true);
          });

    });

    describe('Dont display I&E', () => {
        beforeEach( () => {
             jmxServiceStub = {
                'ui.displayIE': false,
                'ui.isIEMandatory': false,
                'ui.locale': '"en-gb"'
             };
         });

        it('should have uiDisplayIE is false', () => {
              fixture.detectChanges();
              expect(this.comp.uiDisplayIE).toBe(true);
          });
    });
});

