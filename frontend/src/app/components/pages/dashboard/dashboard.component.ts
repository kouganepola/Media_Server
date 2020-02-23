import { Component, HostBinding } from '@angular/core';
import { UpgradableComponent } from 'theme/components/upgradable';
import * as dialogPolyfill from 'dialog-polyfill'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent extends UpgradableComponent {

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;

  private dialogBox;
  path: string;
  createFolder: boolean;
  uploadFile: boolean;
  alertMessage:string;
  alert:boolean;
  newFile: File;

  constructor(private activatedRoute: ActivatedRoute) {
          super();

          this.activatedRoute.params.subscribe(params => {

            this.path = ['./', params['folder'].replace(/:/g, "/")].join("");

          });

  }

  ngOnInit() {

          this.dialogBox = document.querySelector('dialog');

          if (!this.dialogBox.showModal) {
            dialogPolyfill.registerDialog(this.dialogBox);
          }   
  }

  onAddNewFile(event) {

          this.newFile = event;
  }

  onSelectPopup(event) {

          if (event === "createFolder") {
            this.createFolder = true;

          } else {

            this.uploadFile = true;
          }

          this.dialogBox.showModal();

          if (!this.dialogBox.showModal) {

            dialogPolyfill.registerDialog(this.dialogBox);
            
          }

  }

  onShowAlert(message){
        this.alert = true;
        this.createFolder = false;
        this.uploadFile = false;
        this.alertMessage = message;


  }

  onHideModal($event) {

          this.createFolder = false;
          this.uploadFile = false;
          this.alert= false;
          this.dialogBox.close();

  }






}
