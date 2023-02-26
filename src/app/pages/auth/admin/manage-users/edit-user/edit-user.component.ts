import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../../../models/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {UserRoleService} from "../../../../../services/user-role.service";
import {Unsub} from "../../../../unsub";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends Unsub implements OnInit {
  userForm!: FormGroup;
  user!: UserModel;
  id!: string | null;
  loading: boolean = false;
  isUserAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    super();
    this.fillUserFormGroup();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getIdFromUrl();
    this.id ? this.userService.getUser(this.id).pipe(takeUntil(this.unsubscribe)).subscribe(user => {
        user ? this.fillUserFormGroup(user) : null;
        this.loading = false;
      }
    ) : null;
    this.userRoleService.getRoles().pipe(takeUntil(this.unsubscribe)).subscribe((roles) => {
      let admins = roles ? Object.keys(roles.admins) : null;
      if (this.id && admins && admins.includes(this.id)) {
        this.isUserAdmin = true;
      } else {
        this.isUserAdmin = false;
      }
    })
  }

  makeUserAdmin() {
    let id = this.userForm.get('id')?.value;
    this.userRoleService.addAdmin(id).then(() => this.isUserAdmin = true);
  }

  removeAdmin() {
    let id = this.userForm.get('id')?.value;
    this.userRoleService.removeAdmin(id).then(() => this.isUserAdmin = false);
  }

  private getIdFromUrl() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')
    this.id ? this.loading = false : this.loading = true
  }

  private fillUserFormGroup(user?: UserModel) {
    this.userForm = new FormGroup({
      id: new FormControl({value: user ? user.id : "", disabled: true}, [Validators.required]),
      name: new FormControl({value: user ? user.name : "", disabled: true}, [Validators.required]),
      lastname: new FormControl({value: user ? user.lastname : "", disabled: true}, [Validators.required]),
      email: new FormControl({value: user ? user.email : "", disabled: true}, [Validators.required]),
      password: new FormControl({value: user ? user.password : "", disabled: true}, [Validators.required]),
      phoneNumber: new FormControl({value: user ? user.phoneNumber : "", disabled: true}, [Validators.required]),
    })
  }
}
