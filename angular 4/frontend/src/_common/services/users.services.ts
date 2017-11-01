import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Request } from './api/request.services';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService{
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private requestService: Request){}

  public login(body): Observable<string>{
    console.log(body);
    return this.requestService.postNoHeaders('/account/login', body)
      .subscribe(data => {
        console.log(data);
         return data; }) //subscribe wachten op antwoord
  }

  public register(body): Observable<string>{
    console.log(body);
    return this.requestService.postNoHeaders('/account/register', body)
      .subscribe(data => { return data; })
  }
}
