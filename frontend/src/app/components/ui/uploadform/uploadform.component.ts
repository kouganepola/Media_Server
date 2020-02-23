import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileService } from '@services/*';
import { Router } from '@angular/router';
import { IServerResponse } from 'app/models/response';
import { File } from 'app/models/file';

@Component({
  selector: 'app-uploadform',
  templateUrl: './uploadform.component.html',
  styleUrls: ['./uploadform.component.scss']
})
export class UploadformComponent implements OnInit {

  
  @Input() path:string;
  @Output() newFile = new EventEmitter<File>();
  @Output() hideModal= new EventEmitter<boolean>();
  @Output() alert = new EventEmitter<string>();
  uploadFileForm: FormGroup;
  submitted = false;
  private fileName;

  private fileToUpload;

  constructor(private fileService:FileService,
    private formBuilder: FormBuilder,private router:Router) {

        this.uploadFileForm = this.formBuilder.group({
          file:new FormControl('',Validators.required)

        });
    this.fileName = this.uploadFileForm.get("file")


  }
  
  ngOnInit() { }

  selectFile(event){

    this.fileToUpload = event.target.files[0];
    this.fileName.setValue(this.fileToUpload.name);   

  }


  uploadFile() {
    
    if (this.uploadFileForm.valid) {
    
      const formData = new FormData();
      formData.append('file',this.fileToUpload);
      formData.append('_id',localStorage.getItem('id'));
      formData.append('path',this.path);

      this.fileService.uploadFile(formData).subscribe(res=>{       
         
          const response = res as IServerResponse;

        if(response.success){
          this.newFile.emit( new File(response.file));
               

        }else{

                
          this.alert.emit(response.message);

        } 

          this.close(); 
      },err=>{

          let response= err.error;
          this.alert.emit(response.message);
          this.close()
          

      });
    }
    
  }

  close(){

    this.hideModal.emit(true);

  }

  public onInputChange(event) {

    event.target.required = true;
    
  }

}
