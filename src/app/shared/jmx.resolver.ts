import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { IdvQuestionsService } from './../idv/idv-questions.service';


@Injectable()
export class JmxResolver implements Resolve<any> {

  constructor(private idvQuestionsService: IdvQuestionsService) {
    console.log('JMX RESOLVER');
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
  	console.log('RESOLVING JMX');
    return this.idvQuestionsService.getJMXproperties();
  }

}
