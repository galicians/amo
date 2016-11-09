/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpModule, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { IdvQuestionsService } from './idv-questions.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let http: Http;

describe('Service: IdvQuestions', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [IdvQuestionsService]
        });
    });


    it('should be defined',
        async(inject([IdvQuestionsService], (service: IdvQuestionsService) => {
            expect(service).toBeDefined();
            
        }))
    );

    it('should get the questions from server',
        async(inject([IdvQuestionsService], (service: IdvQuestionsService) => {
            
            service.getIdvQuestions().subscribe( 
                value => {
                    let obj1 = value[0];
                    let answer1 = obj1;

                    expect(answer1['sequence']).toBe(1); 
                },
                error => {
                    console.log('error::: ', error);
                }
            );
        }))
    );

    it('should send answers to the sever, and return 200',
        async(inject([IdvQuestionsService], (service: IdvQuestionsService) => {
            
                let answers = [
                    {
                        sequence: 1, name: 'idv.question.account.number',
                        id: 7, description: 'Please enter your 1st Credit Reference',
                        field: 'customerAccountVO.accountNumber',
                        channel: 'WEB', whenLogged: undefined, dataType: 'STRING',
                        dataFormat: null, answer: '999999999'
                    },
                    {
                        sequence: 2, name: 'idv.question.dob',
                        id: 8, description: 'Please enter your Date of Birth',
                        field: 'customerVO.dateOfBirth',
                        channel: 'WEB', whenLogged: undefined, dataType: 'DATE',
                        dataFormat: 'dd-MM-yyyy', answer: '10-10-1980'
                    },
                    {
                        sequence: 3, name: 'idv.question.post.code',
                        id: 9, description: 'Please enter your Post Code',
                        field: 'customerAddressVO.postCode',
                        channel: 'WEB', whenLogged: undefined, dataType: 'POSTCODE',
                        dataFormat: null, answer: '69907'
                    }
                ];

                service.postIdvQuestions(answers).subscribe( 
                    value => {
                        expect(value.status).toEqual(200);
                    },
                    error => {
                        console.log('error::: ', error);
                    }
                );
            
        }))
    );
});

