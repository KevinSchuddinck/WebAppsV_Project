import {Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../../_common/services/users.services';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  registerlink = environment.baseUrl + '/register';
  title = 'Login';
  loginForm: FormGroup;
  success: string;
  textSuccess: string;
  successStatus = false;
  // Lifecycle
  constructor (private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([ Validators.required]) ],
      'password': [null, Validators.compose([Validators.required]) ]
    });
  }

  ngOnDestroy() {
  }

  login(): void {
      this.userService.login(this.loginForm.value).subscribe(data => {
         localStorage.setItem('currentUser', JSON.stringify(data));
       }, error => {
           if (error.error.message === 'invalid credentials') {
             this.loginFailed('Wrong credentials.');
           } else {
             this.loginFailed('Something went wrong, please try again.');
             console.log(error);
           }
       }, () => this.router.navigateByUrl('/home'));
  }

  private loginFailed(message) {
    this.success = 'alert alert-danger';
    this.textSuccess = message;
    this.successStatus = true;
  }
}
