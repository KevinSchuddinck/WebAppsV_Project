import {Component, OnInit, OnDestroy} from "@angular/core";
import {UserService} from "../../../_common/services/users.services"

import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'fc-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  title="login";
  loginForm: FormGroup;
  registerForm: FormGroup;
  // Lifecycle
  constructor (
    private UserService: UserService,
    private FormBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.FormBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
    this.registerForm = this.FormBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnDestroy() {
    //subscriptions unsubscriben
  }

  login(): void {
    this.UserService.login(this.loginForm.value);
  }

  register(): void{
    //hier check op passwords
    this.UserService.register(this.registerForm.value);
  }
}
