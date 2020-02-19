import { Component } from '@angular/core';
import { AuthService} from '@services/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
})
export class CommonLayoutComponent {

  private user;
  constructor(private authService:AuthService,private router:Router){


  }

  public ngOnInit() {
    this.authService.userData.subscribe(user => {
    if(user){

      this.user=user;
    }   

    else{
      this.router.navigate(['../../auth/login'],{ queryParams: { message: "Something went wrong. Retry Login."}});
    }
      
  },err=>this.router.navigate(['../../auth/login'],{ queryParams: { message: "Something went wrong. Retry Login." } }));
  }

  public logout() {
    this.authService.logout()
      .subscribe(res => this.router.navigate(['../../auth/login']));
  }
 }
