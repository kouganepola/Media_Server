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

  
  private dialog;
  path:string;
  createFolder:boolean;
  uploadFile:boolean;
  

  constructor(private activatedRoute:ActivatedRoute){
      super();
      this.activatedRoute.params.subscribe( params => {

        
        this.path = ['./',params['folder'].replace(/:/g,"/")].join("");
  
        
        
    });

    
  }

  ngOnInit(){
    
    this.dialog = document.querySelector('dialog');
    // this.folderName = document.getElementById('folderName');
    if (! this.dialog.showModal) {
      dialogPolyfill.registerDialog(this.dialog);
  }
}

  


  onSelectPopup(event){

    if(event==="createFolder") {this.createFolder=true; 
    
    }else{

      this.uploadFile = true;
    } 
    
    
    this.dialog.showModal(); // Show-Hide Modal Check
    if (! this.dialog.showModal) {
      dialogPolyfill.registerDialog(this.dialog);
    }

 
  }

  onHideModal($event){

    this.createFolder=false;
    this.uploadFile = false;
    //TODO: refresh table
    this.dialog.close();

  }

  




}
