import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IdvQuestion } from './idv-question.model';
import { IdvAnswer } from './idv-answer.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// to make this service available to DI we need to add the @Injectable annotation
@Injectable()
export class IdvQuestionsService {
  public baseUrl: string = 'https://1stcredit-uat.telrock.com/telrock-tas-war/rest/';
  public body: any;
  // public body: string|Array<IdvAnswer>; why this fails;


  constructor(private http: Http) { }

  public getJMXproperties(): Observable<Response> {
    return this.http.get(this.baseUrl + 'properties', this.getRequestOptions())
      .map((res: Response) => {
        return (<any>res.json().data);
      });
  }

  public postIdvQuestions(answers) {
    this.body = [];
    answers.map(answer => {
      this.body.push(new IdvAnswer(answer));
    });

    this.body = JSON.stringify(this.body);

    return this.http.put(this.baseUrl + 'idv/process', this.body, this.getRequestOptions())
      .map((res: Response) => {
        return res;
      });
      // .subscribe(
      //   data => data.json().data,
      //   error => console.log('error', error),
      //   () => console.log('PUT to idv/process completed')
      // )
  }

  public getIdvQuestions(): Observable<Object[]> {
    this.body = '{}';
    return this.http.post(this.baseUrl + 'idv/process', this.body, this.getRequestOptions())
      .map((res: Response) => {
        return (<any>res.json()).data.map(item => {

          // console.log('question', typeof item, item.name)

          return new IdvQuestion({
            channel: item.channel,
            dataFormat: item.dataFormat,
            dataType: item.dataType,
            description: item.description,
            field: item.field,
            id: item.id,
            name: item.name,
            sequence: item.sequence,
            type: item.string
          });

        });
    });
      // .catch(error => {
      //   console.log('error', error)
      //   return error
      // })

  }

  private getRequestOptions() {
    let options = new RequestOptions({
      headers: this.getHeaders(),
      withCredentials: true
    });
    return options;
  }



  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return headers;
  }
}

