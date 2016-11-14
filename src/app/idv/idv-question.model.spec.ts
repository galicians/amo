/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IdvQuestion } from './idv-question.model';

let testQuestion;
let testObject: any;

describe('IdvQuestion: Model', () => {

    testObject = {
        name: 'TestObject',
        answer: null
    };

    testQuestion = new IdvQuestion( testObject );

    it('should create an instance', () => {
        expect(testQuestion).toBeDefined();
    });

    it('should have a name field and null answer', () => {
        expect(testQuestion.name).toContain('TestObject');
        expect(testQuestion.answer).toBe(null);
    });

});
