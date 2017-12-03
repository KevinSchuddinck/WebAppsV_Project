import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Blogpost } from '../../../app/pages/home/blogpost';

interface PossibleResponseInterface {
  results: Blogpost[];
}

@Injectable()
export class Request {
  private headers: HttpHeaders;
  private token = '';
  private apiUrl = environment.apiUrl;
  private setHeaders(): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    if (this.token !== '') {
      this.headers = this.headers.append('Authorization', `Bearer ${this.token}`);
    }
  }

  constructor(private http: HttpClient) {
  }

  public postNoHeaders(uri, data: Object): any {
    return this.http.post(`${this.apiUrl}${uri}`, data);
  }

  public post<T>(uri, data: Object): Observable<T> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.token !== '') {
      this.headers = this.headers.append('Authorization', `Bearer ${this.token}`);
    }
    console.log(data);
    // hier gaat het mis
    return this.http.post<T>(`${this.apiUrl}${uri}`, data, {
      headers: this.headers,
    });
  }

  public get<T>(uri): Observable<T> {
    this.setHeaders();
    return this.http.get<T>(`${this.apiUrl}${uri}`, {
      headers: this.headers,
    });
  }

  public setAuth(data: any): void {
    this.token = data.authToken;
  }
}
