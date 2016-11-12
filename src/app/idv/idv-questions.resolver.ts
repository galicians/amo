import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { IdvQuestionsService } from './idv-questions.service';


@Injectable()
export class IdvResolver implements Resolve<any> {

  constructor(private idvQuestionsService: IdvQuestionsService) {}

  resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {
       return this.idvQuestionsService.getIdvQuestions();
  }

}
