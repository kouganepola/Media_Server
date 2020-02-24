import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/';
import { BlankLayoutCardComponent } from '../../../ui';
import { User } from 'app/models/user';


@Component({
  selector: 'app-login',
  styleUrls: ['../../../ui/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent extends BlankLayoutCardComponent implements OnInit {
  
  private username;
  private password;
  loginForm: FormGroup;
  error: string;

  constructor(private authService: AuthService,
          private formBuilder: FormBuilder,
          private router: Router, private route: ActivatedRoute) {

          super();
          this.loginForm = this.formBuilder.group(
            {
            password: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required)
            }
          );
          this.username = this.loginForm.get('username');
          this.password = this.loginForm.get('password'); 
  }


  public ngOnInit() {

          this.loginForm.valueChanges.subscribe(() => {
                  this.error = null;
          });
          this.route.queryParamMap.subscribe(params => this.error = params.get('message'));

  }

  public login() {

          this.error = null;

          if (this.loginForm.valid) {

            this.authService.login(this.loginForm.getRawValue()).subscribe(res => {
             
              if (res instanceof User){
              this.router.navigate(['../../app', localStorage.getItem('username'), 'myfiles', localStorage.getItem('root')], { relativeTo: this.route });

              }else{


                this.password.reset();
              this.username.reset();
              this.error = res;
              }
            }, loginErr => {

              let response = loginErr.error;
              this.password.reset();
              this.username.reset();
              this.error = response.message;

            });

          }
  }

  public onInputChange(event) {
          event.target.required = true;
  }
}
