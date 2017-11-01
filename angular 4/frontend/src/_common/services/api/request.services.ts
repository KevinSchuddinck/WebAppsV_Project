import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class Request {
  private headers: Headers=new Headers();
  private baseUrl= environment.baseUrl;
  private setHeaders(): void{
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  constructor(private http: Http){

  }

  public postNoHeaders(uri, data: Object): any{
    this.setHeaders()
    console.log(data)
    return this.http.post(`${this.baseUrl}${uri}`, data, this.headers);
  }
}
