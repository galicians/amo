import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Request, Response, Headers, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

@Injectable()
export class JMXservice {
	constructor(private http: Http) { }

	//public baseUrl: string = 'https://1stcreditv5-dev.telrock.com/telrock-tas-war/rest/';

	public getJMXproperties(): Observable<Response> {
		
		let baseUrl: string = 'https://1stcreditv5-dev.telrock.com/telrock-tas-war/rest/';
		return this.http.get(baseUrl + 'properties', this.getRequestOptions())
			.map((res: Response) => {
				return (<any>res.json().data);
		});
	}

	private getRequestOptions() {
		let options = new RequestOptions({
			headers: this.getHeaders(),
			withCredentials: false  //true  set to false for local dev
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
