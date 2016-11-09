import { TestBed, async, inject } from '@angular/core/testing';

import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

import {IdvQuestionsService} from './idv-questions.service';

describe('idv: question resolver', () => {
	beforeEach( async(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				{provide: IdvQuestionsService}
			]
		});
	}));

	it('should be defined', () => {});
});