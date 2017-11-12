import {Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../../_common/services/users.services';
import { Observable } from 'rxjs/Rx';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { matchValidator } from './login.validators';

@Component({
  selector: 'fc-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  title = 'Login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  // Lifecycle
  constructor (private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([ Validators.required]) ],
      'password': [null, Validators.compose([Validators.required]) ]
    });

    this.registerForm = this.formBuilder.group({
      'email': [null, Validators.compose([ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$')])],
      'firstName': [null],
      'lastName': [null],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(4)]) ],
      'passwordCheck': [null, Validators.compose([Validators.required,  matchValidator('password')]) ]
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

  register(): void {
      this.userService.register(this.registerForm.value);
  }
}
