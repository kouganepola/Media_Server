import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileService } from '@services/*';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadform',
  templateUrl: './uploadform.component.html',
  styleUrls: ['./uploadform.component.scss']
})
export class UploadformComponent implements OnInit {

  // title = 'angularpopup';
  @Input() path:string;
  @Output() hideModal= new EventEmitter<boolean>();
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
  
  ngOnInit() {     

    
}

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

        
        //TODO:show message
        //refresh page
      console.log(res)
      this.close();
      
    
    
    
  },err=>{

    let response= err.error;
    console.log(response)
    this.close()
    //TODO:change
    // alert( response.message);


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
