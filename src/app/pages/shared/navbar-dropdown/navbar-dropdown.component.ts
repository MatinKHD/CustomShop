import {Component, Input, OnInit} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {UserService} from "../../../services/user.service";
import {takeUntil} from "rxjs";
import {UserRoleService} from "../../../services/user-role.service";
import {Unsub} from "../../unsub";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.scss']
})
export class NavbarDropdownComponent extends Unsub implements OnInit {
  @Input() auth!: Auth;
  isUserOwner: boolean = false;
  isUserAdmin: boolean = false;
  roleLoading: boolean = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private userRoleService: UserRoleService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRoles();
  }

  private getRoles() {
    this.roleLoading = true;
    this.userRoleService.getRoles().pipe(takeUntil(this.unsubscribe)).forEach((roles) => {
      let adminsId = roles ? Object.keys(roles.admins) : null;
      let ownersId = roles ? Object.keys(roles.owners) : null;
      this.auth.currentUser?.uid && adminsId?.includes(this.auth.currentUser?.uid) ? this.isUserAdmin = true : this.isUserAdmin = false;
      this.auth.currentUser?.uid && ownersId?.includes(this.auth.currentUser?.uid) ? this.isUserOwner = true : this.isUserOwner = false;
      this.roleLoading = false;
    }).catch(error => console.log(error))
  }
}
