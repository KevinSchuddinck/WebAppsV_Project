import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Request } from './api/request.services';
import { environment } from '../../environments/environment';
import { BlogPostResponseInterface } from './blog-post-response.interface';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private requestService: Request, private router: Router) {}

  public login(body): Observable<string> {
    return this.requestService.postNoHeaders('/account/login', body);
  }

  public register(body): Observable<string> {
    return this.requestService.postNoHeaders('/account/register', body);
  }

  public getBlogposts(): Observable<BlogPostResponseInterface> {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.requestService.setAuth(currentUser);
    } catch (err) {
      console.log(err);
    }
    return this.requestService.get<BlogPostResponseInterface>('/blogpost/get');
  }

  public sendBlogpost(body): Observable<string> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.requestService.setAuth(currentUser);
    return this.requestService.post<string>('/blogpost/send', body);
  }
}
