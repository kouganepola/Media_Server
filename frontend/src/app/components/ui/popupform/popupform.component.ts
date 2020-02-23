import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as dialogPolyfill from 'dialog-polyfill';
import { FileService } from '@services/*';
import { Router } from '@angular/router';
import { File } from 'app/models/file';
import { IServerResponse } from 'app/models/response';

@Component({
  selector: 'app-popupform',
  templateUrl: './popupform.component.html',
  
})
export class PopupformComponent {

  @Input() path:string;
  @Output() hideModal= new EventEmitter<boolean>();
  @Output() newFolder = new EventEmitter<File>();
  @Output() alert = new EventEmitter<string>();
  createFolderForm: FormGroup;
  submitted = false;
  private folderName;

  constructor(private fileService:FileService,
    private formBuilder: FormBuilder,private router:Router) {
        this.createFolderForm = this.formBuilder.group({
            folderName: new FormControl('', Validators.required)

        });
    this.folderName = this.createFolderForm.get('folderName');

  }
  
  createFolder() {   
          this.fileService.createFolder(this.createFolderForm.getRawValue().folderName,this.path).subscribe(res=>{
              
              //todo:show message
              console.log(res)
              const response = res as IServerResponse;

              if(response.success){
                    
                console.log(JSON.stringify(response))
                    this.newFolder.emit( new File(response.file));
              }else{

                
                    this.alert.emit(response.message);

              }   


              
              this.close();  
          
          },err=>{

              let response= err.error;
              
              this.alert.emit(response.message);


          });
   
  }

  close(){

    this.hideModal.emit(true);

  }


  onInputChange(event) {

    event.target.required = true;

  }


}
