/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IdvQuestion } from './idv-question.model';

let testQuestion;

describe('IdvQuestion: Model', () => {

    it('should create an instance', () => {
        expect(testQuestion).not.toBeDefined();

        testQuestion = new IdvQuestion( {} );
        expect(testQuestion).toBeDefined();
    });

});
