import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert-dialog.component.html',
  
})
export class AlertDialogComponent {

  @Input() message :string;
  @Output() hideModal= new EventEmitter<boolean>();

  constructor() {
        

  }
  
  close(event){

    this.hideModal.emit(true)
  }


  onInputChange(event) {

    event.target.required = true;

  }


}
