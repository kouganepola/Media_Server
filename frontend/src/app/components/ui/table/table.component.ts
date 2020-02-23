import { Component, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { UpgradableComponent } from 'theme/components/upgradable';
import { FileService, AuthService } from '@services/';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IServerResponse } from 'app/models/response';
import { saveAs } from 'file-saver';
import { File } from 'app/models/file';
import { User } from 'app/models/user';

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})

export class TableComponent extends UpgradableComponent {
  @HostBinding('class.projects-table') private readonly projectsTable = true;
  
  private tableHeader: String[];
  private data: File[];
  private user:User;
  private _path:string;
  title: String[];

  @Input() set newFile(file: File) {
  
      this.data.push(file);
      
  };

  @Input() set path(path: string) {
      this._path = path;
      this.ngOnInit();
      componentHandler.upgradeDom();
  };

  @Output() popUpForm = new EventEmitter<string>();
  @Output() alert = new EventEmitter<string>();

  public constructor(private fileService: FileService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    super();

    this.authService.userData.subscribe(user => {
          if (user) {
            this.user = user;
          }

    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {

      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {

        this.router.navigated = false;
      }

    });

  }


  ngOnInit() {

    this.setTableTitle();
    this.getTableHeaders();
    this.getData();

  }

  public setTableTitle() {

    this.title = this._path.replace("./", "").split("/")

  }

  public getTableHeaders() {

    this.tableHeader = ['',
      'File Name',
      'File Type',
      'Size',
      'Last Updated',
    ];

  }


  public getData() {


    this.fileService.getUserFiles(this._path).subscribe((response) => {

      
      let files = response.map(file => new File(file));

      if (files.length != 0) {
        

        this.data = files;
        this.setTableTitle();
      }
      else {
        this.data = []
      }


    });
  }


  public createFolder() {

    this.popUpForm.emit("createFolder");

  }

  public uploadFile() {

    this.popUpForm.emit("uploadFile");

  }

  public onSelectFolder(index) {
    let folderPath = this.title.slice(0, index + 1);
    this.router.navigate(['..', folderPath.join(":")], { relativeTo: this.activatedRoute });

  }

  deleteFile(index) {

    this.fileService.deleteFile(this.data[index]).subscribe(res => {

      const response = res as IServerResponse;

        if(response.success){
          this.data.splice(index, 1);
        }else{            
          this.alert.emit(response.message);
        } 

    }, err => {

      let response= err.error;
      this.alert.emit(response.message);
      
    });

  }

  downloadFile(file) {

    this.fileService.downloadFile(file._id).subscribe(res => {
      
      const blob = new Blob([res], { type: file.fileType });
      saveAs(blob, file.fileName);

    }, err => {
      let response= err.error;
      this.alert.emit(response.message);
    }

    );


  }

  viewFile(file) {

    if (file.fileType === 'folder') {
      //TODO: Add validation at create folder

      let path = file.path.replace(".\/", "")
      path = path.replace(/\//g, ":")

      this.router.navigate(['..', [path, file.fileName].join(":")], { relativeTo: this.activatedRoute });

    }
    else {

      this.fileService.viewFile(file._id).subscribe(res => {
        const blob = new Blob([res], { type: file.fileType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);

      }, err => {
        let response= err.error;
        this.alert.emit(response.message);
      }
      );
    }
  }
}
