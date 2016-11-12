import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {

    data = this.subject.asObservable();

    private subject = new BehaviorSubject(this.testData);
    private _testData: { questions: [ {}, {}, {} ] };

    get testData() { return this._testData; }
    set testData( data: { questions: [ {}, {}, {} ] } ) {
        this._testData = data;
        this.subject.next(data);
    }

    get snapshot() {
        return { data: this.testData };
    }
}
