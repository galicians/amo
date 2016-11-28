import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { IdvQuestionsService } from './../idv/idv-questions.service';


@Injectable()
export class JmxResolver implements Resolve<any> {

  constructor(private idvQuestionsService: IdvQuestionsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    return this.idvQuestionsService.getJMXproperties();
  }

}
