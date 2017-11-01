import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const landingRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "login",
    component: LoginComponent,
  }
]);

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    landingRouting,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [LoginComponent]
})

export class LoginModule { }
