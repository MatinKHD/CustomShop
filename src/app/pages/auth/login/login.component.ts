import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  get email() {
    return this.loginForm.get('eamil');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,])
    })

  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You Must Enter Value'
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  loginClicked() {
    this.authService.loginUser(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
  }

  logout() {

  }
}
