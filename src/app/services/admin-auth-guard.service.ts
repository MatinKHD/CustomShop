import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {getAuth} from "@angular/fire/auth";
import {UserService} from "./user.service";
import {map} from "rxjs";
import {UserRoleService} from "./user-role.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  auth = getAuth();

  adminsIds: any[] | null = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private userRoleService: UserRoleService,
  ) {
  }

  canActivate() {
    return this.userRoleService.getRoles().pipe(map((roles) => {
      this.adminsIds = roles?.admins ? Object.keys(roles.admins) : null;
      if (this.adminsIds?.includes(this.auth.currentUser?.uid)) return true;

      this.router.navigate(['landing'])
      return false
    }))
  }
}
