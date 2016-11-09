/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { DebugElement, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import { IdvQuestionsService} from './idv-questions.service';
import { IdvQuestion } from './idv-question.model';
// import { IdvQuestionsStub } from './idv-question-stubs';

import { ActivatedRouteStub } from './idv-router-stubs';
import { IdvComponent } from './idv.component';

let fixture;
let comp;
let de;
let el;
let mockIdvQuestionsService;
let myidvQuestionsStub;
let idvSpy;
let idvSubmitSpy;
let idvQuestions;


class RouterStub {
    navigateByUrl(url: string) { return url; }
    baseUrl: string;
}

//class ActivatedRouteStub {}

class IdvQuestionsServiceStub {}

describe('Component: Idv', () => {
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [IdvComponent],
            providers: [
                { provide: IdvQuestionsService },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub },
                { provide: Router }
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(IdvComponent);
        comp = fixture.componentInstance;
    }));

    /*
    it('should create an instance', inject([ActivatedRoute], (route: ActivatedRoute) => {

        let idvQuestions = [ 1,2,3 ];
        //route = new ActivatedRoute();
        route.data = new Observable( (questions) => {
            questions.next(1);
            questions.next(2);
            questions.next(3);
            questions.complete();
        });
        
        //route.data = idvQuestions;

        console.log(route);
        expect(comp).toBeDefined(); 
    }));
    
    
    
    it('should call IdvQuestion and return Observable array', async(() => {
        mockIdvQuestionsService = fixture.debugElement.injector.get(IdvQuestionsService);
        idvSpy = spyOn(mockIdvQuestionsService, 'getIdvQuestions')
        .and.returnValue(Observable.of( [ 
            {name: 'Test Question1'}, {name: 'Test Question2'}, {name: 'Test Question3'} 
        ] ));

        fixture.detectChanges(); 
        fixture.whenStable().then(() => {
            fixture.detectChanges(); 
        });
        expect(mockIdvQuestionsService.getIdvQuestions).toHaveBeenCalled();     
    }));
    */

    /*
    it('should submit IdvAnswers', async(() => {
        idvQuestions = [ {answer:"answer1"}, {answer:"answer2"}, {answer:"answer3"} ];
        mockIdvQuestionsService = fixture.debugElement.injector.get(IdvQuestionsService);
        idvSpy = spyOn(mockIdvQuestionsService, 'postIdvQuestions').and.returnValue( {status:200} );

        let returnedObj = idvSpy();
        expect(returnedObj.status).toEqual(200);        
    }));
    */


});

