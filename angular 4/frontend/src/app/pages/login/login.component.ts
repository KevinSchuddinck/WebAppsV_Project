import {Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../../_common/services/users.services';
import { Observable } from 'rxjs/Rx';

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
  // Lifecycle
  constructor (private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([ Validators.required]) ],
      'password': [null, Validators.compose([Validators.required]) ]
    });
  }

  ngOnDestroy() {
    // subscriptions unsubscriben
  }

  login(): void {
    try {
      this.userService.login(this.loginForm.value);
    } catch (err) {
      console.log(err);
    }
  }
}
