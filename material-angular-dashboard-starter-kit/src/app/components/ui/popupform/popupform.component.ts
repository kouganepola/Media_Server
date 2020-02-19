import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as dialogPolyfill from 'dialog-polyfill';
import { FileService } from '@services/*';
import { Router } from '@angular/router';



@Component({
  selector: 'app-popupform',
  templateUrl: './popupform.component.html',
  
})
export class PopupformComponent implements OnInit{


  @Input() path:string;
  @Output() hideModal= new EventEmitter<boolean>();
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
  
  ngOnInit() {

}


createFolder() {
  

   
    this.fileService.createFolder(this.createFolderForm.getRawValue().folderName,this.path).subscribe(res=>{

        
        //todo:show message
      console.log(res)
      window.location.reload()
      this.close();

      
      
    
    
    
  },err=>{

    let response= err.error;
    console.log(response)
    this.close()
    //TODO:change
    // alert( response.message);


  });
   
}



close(){

  this.hideModal.emit(true);
}

public onInputChange(event) {
  event.target.required = true;
}




  

}
