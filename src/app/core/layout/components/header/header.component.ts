import {Component} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {getAuth} from "@angular/fire/auth";
import {UserService} from "../../../../services/user.service";
import {UserRoleService} from "../../../../services/user-role.service";
import {UserModel} from "../../../../pages/models/user.model";
import {Observable, switchMap, takeUntil} from "rxjs";
import firebase from "firebase/compat";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import {Unsub} from "../../../../pages/unsub";
import User = firebase.User;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Unsub {
  isMenuCollapsed: boolean = true;
  auth = getAuth();
  userLoading: boolean = false;
  user!: UserModel | null;
  shoppingCartItemsCount: number = 0

  constructor(
    public userService: UserService,
    private userRoleService: UserRoleService,
    private cartService: ShoppingCartService,
  ) {
    super();
    this.getUser();
    this.totalItemCount();
  }


  private getUser() {
    this.userLoading = true
    this.userService.user$
      .pipe(
        switchMap((user: User | null) => {
          user ? localStorage.setItem('uid', user?.uid) : null;
          return user ? this.userService.getUser(user.uid) : new Observable<any>();
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe(user => {
        this.user = user;
        this.userLoading = false;
      })
  }

  // this method will calculate total item's quantity for each user or each shopping cart.
  private async totalItemCount() {
    try {
      (await this.cartService.getCart()).valueChanges().pipe(takeUntil(this.unsubscribe)).subscribe(cart => {
        let items = cart?.items ? Object.values(cart.items) : null;
        this.shoppingCartItemsCount = 0
        items?.map(item => this.shoppingCartItemsCount += item.quantity)
      })
    } catch (err) {
      console.log(err);
    }
  }

}
