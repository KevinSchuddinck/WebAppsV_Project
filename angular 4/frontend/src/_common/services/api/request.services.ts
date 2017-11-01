import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class Request {
  private headers: Headers=new Headers();
  private token = "";
  private baseUrl= environment.baseUrl;
  private setHeaders(): void{
    if(this.token !== ""){
      this.headers.set('Authorization', `Bearer ${this.token}`);
    }
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  constructor(private http: Http){

  }

  public postNoHeaders(uri, data: Object): any{
    this.setHeaders();
    return this.http.post(`${this.baseUrl}${uri}`, data, this.headers);
  }

  public post(uri, data: Object): any{
    this.setHeaders();
    return this.http.post(`${this.baseUrl}${uri}`, data, this.headers);
  }

  public get(uri): any{
    this.setHeaders();
    return this.http.get(`${this.baseUrl}${uri}`, this.headers);
  }

  public setAuth(data: any): void{
    this.token = data.authToken;
  }
}
