import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../_common/services/users.services';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { matchValidator } from '../../validators/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy  {
  loginlink = environment.baseUrl + '/login';
  registerForm: FormGroup;
  emailCtrl: FormControl;
  firstnameCtrl: FormControl;
  lastnameCtrl: FormControl;
  passwordCtrl: FormControl;
  passwordCheckCtrl: FormControl;
  success: string;
  textSuccess: string;
  successStatus = false;
  // Lifecycle
  constructor (private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.emailCtrl = this.formBuilder.control('', [ Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,3}$')]);
    this.firstnameCtrl = this.formBuilder.control(null);
    this.lastnameCtrl = this.formBuilder.control(null);
    this.passwordCtrl = this.formBuilder.control('', [Validators.required,
      Validators.minLength(4) ]);
    this.passwordCheckCtrl = this.formBuilder.control('', [Validators.required,
      matchValidator('password') ]);

    this.registerForm = this.formBuilder.group({
      'email': this.emailCtrl,
      'firstName': this.firstnameCtrl,
      'lastName': this.lastnameCtrl,
      'password': this.passwordCtrl,
      'passwordCheck': this.passwordCheckCtrl
    });
  }

  ngOnDestroy() {
    // subscriptions unsubscriben
  }

  register(): void {
    console.log('clicked');
    if (this.registerForm.status === 'VALID') {
        this.userService.register(this.registerForm.value).subscribe(data => {
          // do nothing
        }, err => {
          console.log(err.message);
          this.RegisterFailed();
        }, () => this.registerSucces());

        this.registerForm.reset();
    }
  }

  private registerSucces() {
    this.success = 'alert alert-success';
    this.textSuccess = 'Your account has been created';
    this.successStatus = true;
  }

  private RegisterFailed() {
    this.success = 'alert alert-danger';
    this.textSuccess = 'Account creation failed.';
    this.successStatus = true;
  }
}
