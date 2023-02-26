import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {map} from "rxjs";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  canActivate(route: any, state: RouterStateSnapshot) {
    return this.userService.user$
      .pipe(
        map((user) => {
          if (user) return true;

          this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
          console.log("user is not loggedIn");
          return false;
        })
      )
  }

}
