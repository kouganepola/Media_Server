import { FormGroup,ValidatorFn } from "@angular/forms"

export const passwordMatchValidator:ValidatorFn = function (group: FormGroup):{[key:string]:boolean}|null {
    
    let password = (group.get('password')).value;
    let confirmPassword = (group.get('confirmPassword')).value;
   
    if(password !== confirmPassword) { 
    
        return { 'passwordMismatch': true }}
    else{return null;};     
  }


 