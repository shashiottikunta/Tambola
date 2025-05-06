import { Observable, of as observableOf } from 'rxjs';

import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private readonly apiRoot: string = 'http://18.210.85.136:8010'

    //private readonly apiRoot: string = 'http://localhost:8010'

	constructor(private readonly http: HttpClient) {}

	doPost(endpoint:any, payload:any) {
		const url = `${this.apiRoot}/${endpoint}`;
		return this.http.post(url, payload).pipe(map((response: any) => response));
	}

	doGet(endpoint:any) {
		
		const url = `${this.apiRoot}/${endpoint}`;
		return this.http.get(url).pipe(map((response: any) => response));
	}

	doUpdate(endpoint:any, payload:any) {
		const url = `${this.apiRoot}/${endpoint}`;
		return this.http.put(url, payload).pipe(map((response: any) => response));
	  }

	doGetWithQueryParams(endpoint: string, params: HttpParams): Observable<any> {
		const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
		const url = `${this.apiRoot}/${endpoint}`;

		return this.http.get(url, { headers, params }).pipe(
			map(response => response)
		);
	}

}
