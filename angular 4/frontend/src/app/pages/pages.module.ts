import {NgModule} from "@angular/core";
import {LoginModule} from "./login/login.module";

@NgModule({
  exports: [
    LoginModule
  ],
  imports: [
    LoginModule
  ]
})

export class PagesModule{};
