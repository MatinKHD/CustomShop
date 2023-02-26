import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {getAuth} from "@angular/fire/auth";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {map} from "rxjs";
import {UserRoleService} from "./user-role.service";

@Injectable({
  providedIn: 'root'
})
export class OwnerAuthGuardService implements CanActivate {
  auth = getAuth();

  ownerIds: any[] | null = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private userRoleService: UserRoleService,
  ) {
  }

  canActivate() {
    return this.userRoleService.getRoles().pipe(map((roles) => {
      this.ownerIds = roles?.owners ? Object.keys(roles.owners) : null;
      if (this.ownerIds?.includes(this.auth.currentUser?.uid)) return true;

      this.router.navigate(['landing'])
      return false
    }))
  }
}
