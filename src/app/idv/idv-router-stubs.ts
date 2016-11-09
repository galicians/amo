import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {
	
	private subject = new BehaviorSubject(this.testData);
	data = this.subject.asObservable();

	private _testData: { questions: [{},{},{}] };
	get testData() { return this._testData; }
	set testData( data: { questions: [{},{},{}] } ) {
		this._testData = data;
		this.subject.next(data);
	}

	get snapshot() {
		return { data: this.testData };
	}
}