import { TestBed, async } from '@angular/core/testing';
import { IdvQuestionsService } from './idv-questions.service';

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
