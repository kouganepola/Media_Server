import { Component } from '@angular/core';
import { AuthService, FileService } from '@services/';
import { Router } from '@angular/router';
import { File } from '../../../models/file';
import { User } from '../../../models/user';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
})

export class CommonLayoutComponent {

  private user:User;
  private allUserfiles:File[];
  private filesToDisplay:File[];

  constructor(private authService: AuthService, private router: Router, private fileService: FileService) {


  }

  public ngOnInit() {
    
    this.authService.userData.subscribe(user => {

      if (user) {

        this.user = user;
      }
      else {

        this.router.navigate(['../../auth/login']);

      }

    }, err => this.router.navigate(['../../auth/login'], { queryParams: { message: "Something went wrong. Retry Login." } }));

    this.getAllFiles();
    this.filesToDisplay = [];

  }

  public logout() {

    this.authService.logout()
      .subscribe(res => this.router.navigate(['../../auth/login']));
  }


  public getAllFiles() {

    this.fileService.searchAllFiles().subscribe(res => {
      this.allUserfiles = res.map(file => new File(file));

    })

  }

  public showAllFiles() {

    this.filesToDisplay = this.allUserfiles;

  }

  public searchFiles(event) {

    const searchString = event.srcElement.value.toLowerCase();
    this.filesToDisplay = [];
    this.allUserfiles.forEach((file:File)=> { 

      if (file.fileName.toLowerCase().includes(searchString)){

        this.filesToDisplay.push(file)
      }

      console.log(this.filesToDisplay)
    });

    componentHandler.upgradeDom("mdl-menu__container");

  }
}
