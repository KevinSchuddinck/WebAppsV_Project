import {NgModule} from '@angular/core';
import {LoginModule} from './login/login.module';
import {HomeModule} from './home/home.module';
import {RegisterModule} from './register/register.module';

@NgModule({
  exports: [
    LoginModule,
    HomeModule,
    RegisterModule
  ],
  imports: [
    LoginModule,
    HomeModule,
    RegisterModule
  ]
})

export class PagesModule {}
