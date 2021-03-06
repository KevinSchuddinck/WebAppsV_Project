import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { Request } from '../_common/services/api/request.services';
import { UserService } from '../_common/services/users.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    PagesModule,
    rootRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Request, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
