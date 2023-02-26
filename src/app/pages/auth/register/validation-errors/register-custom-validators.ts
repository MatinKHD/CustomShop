import {AbstractControl} from "@angular/forms";


export class RegisterValidators {
  static matchPassword(control: AbstractControl) {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');
    if (password?.value === confirmPassword?.value) {
      return null;
    }else {
     return{matchPassword: true};
    }
  }
}
