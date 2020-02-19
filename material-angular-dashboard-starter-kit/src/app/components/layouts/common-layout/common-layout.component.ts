import { Component } from '@angular/core';
import { AuthService, FileService} from '@services/';
import { Router } from '@angular/router';
import {File} from '../../../models/file'

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
})
export class CommonLayoutComponent {

  private user;

  private allUserfiles;
  private filesToDisplay;
  constructor(private authService:AuthService,private router:Router,private fileService:FileService){


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

        this.getAllFiles();
  }

  public logout() {
    this.authService.logout()
      .subscribe(res => this.router.navigate(['../../auth/login']));
  }


  public getAllFiles(){
      this.fileService.searchAllFiles().subscribe(res=>{
        this.allUserfiles = res.map(file=> new File(file));
          
        

      })

  }

  public showAllFiles(){
    this.filesToDisplay = this.allUserfiles;

  }
  public searchFiles(event){

     const searchString = event.srcElement.value
    // this.filesToDisplay = null;
    // this.allUserfiles.forEach((file:File)=> { 

    //   if (file.fileName.toLowerCase()===searchString){

    //     this.filesToDisplay.push(file)
    //   }
      
    // });

  }
 }
