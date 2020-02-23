import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '@services/*';

import { BlankLayoutCardComponent } from 'app/components/ui/blank-layout-card';
import {passwordMatchValidator} from '../../../../utils/utils';

@Component({
  selector: 'app-sign-up',
  styleUrls: ['../../../ui/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent extends BlankLayoutCardComponent implements OnInit {

  
  private email;
  private password;
  private username;
  private confirmPassword;
  private checkbox;
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  error: string;
  signupForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,private route: ActivatedRoute) {

            super();

            this.signupForm = this.fb.group(
              {
                password: new FormControl('', Validators.required),
                email: new FormControl('', [
                          Validators.required,
                          Validators.pattern(this.emailPattern),
                          Validators.maxLength(20),
                 ]),
                username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
                confirmPassword:new FormControl('',Validators.required),
                checkbox:new FormControl(false,Validators.required)

              },{validator:passwordMatchValidator});
              
              this.email = this.signupForm.get('email');
              this.password = this.signupForm.get('password');
              this.username = this.signupForm.get('username');
              this.confirmPassword = this.signupForm.get('confirmPassword');
              this.checkbox = this.signupForm.get('checkbox');

  }

  public ngOnInit() {

    this.authService.logout();
    this.signupForm.valueChanges.subscribe(() => {
      this.error = null;
    });

  }

  public login() {

    this.error = null;
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.getRawValue())
        .subscribe(res =>{ 
        
          this.router.navigate(['../../app',localStorage.getItem('username'),'myfiles',localStorage.getItem('root')])
        },
          error => this.error = error.message);
    }

   
  }

  public onInputChange(event) {
    event.target.required = true;
  }

  
}
