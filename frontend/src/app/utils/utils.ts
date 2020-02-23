import { FormGroup,ValidatorFn } from "@angular/forms"

export const passwordMatchValidator:ValidatorFn = function (group: FormGroup):{[key:string]:boolean}|null {
    
    let password = (group.get('password')).value;
    let confirmPassword = (group.get('confirmPassword')).value;
    console.log(password);
    console.log(confirmPassword);
    console.log(password !== confirmPassword );
    if(password !== confirmPassword) { 
    
        return { 'passwordMismatch': true }}
    else{return null;};     
  }


 