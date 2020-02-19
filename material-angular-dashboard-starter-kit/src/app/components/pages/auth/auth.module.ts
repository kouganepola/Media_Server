import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { ThemeModule } from 'theme';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password';
import { LoginComponent } from './login';
import { SignUpComponent } from './sign-up';
import { AuthService} from '@services/';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
  ],providers:[
      AuthService
  ]
})
export class AuthModule { }
