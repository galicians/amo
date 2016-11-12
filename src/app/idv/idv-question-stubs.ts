import { Injectable } from '@angular/core';

@Injectable()
export class IdvQuestionsStub {

    public body: any;

    public getIdvQuestions() {
        return [
            {
                sequence: 1,
                name: 'idv.test.question.account',
                id: 1,
                description: 'stub test account question',
                field: 'testfield1',
                channel: 'WEB',
                whenLogged: undefined,
                dataType: 'STRING',
                dataFormat: null,
                answer: null
            },
            {
                sequence: 2,
                name: 'idv.test.question.dob',
                id: 2,
                description: 'stub test dob question',
                field: 'testfield2',
                channel: 'WEB',
                whenLogged: undefined,
                dataType: 'STRING',
                dataFormat: null,
                answer: null
            },
            {
                sequence: 3,
                name: 'idv.test.question.postcode',
                id: 3,
                description: 'stub test postcode question',
                field: 'testfield3',
                channel: 'WEB',
                whenLogged: undefined,
                dataType: 'STRING',
                dataFormat: null,
                answer: null
            }
        ];
    }

    public postIdvQuestions(answers) {

    }

}
