import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterValidators} from "./validation-errors/register-custom-validators";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isFormInValid: boolean = true;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(\\+98|0)?9\\d{9}')]),
      passwordGroup: new FormGroup({
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$')
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern('^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$'),
        ])
      }, RegisterValidators.matchPassword)
    })
  }

  registerClicked() {
    const body = {
      name: this.registerForm.controls['name']?.value ,
      lastname: this.registerForm.controls['lastname']?.value,
      email: this.registerForm.controls['email']?.value,
      phoneNumber: this.registerForm.controls['phoneNumber']?.value,
      password: (this.registerForm.controls['passwordGroup'] as FormGroup).controls['password']?.value,
    }
    this.authService.registerUser(body)

  }
}
