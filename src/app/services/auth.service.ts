import {Injectable} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../pages/models/user.model";
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot, SnapshotAction} from "@angular/fire/compat/database";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  createUserWithEmailAndPassword, deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "@angular/fire/auth";
import firebase from "firebase/compat";
import {UserService} from "./user.service";
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users: Array<UserModel> = [
    {
      "name": "matin",
      "lastname": "khd",
      "email": "matin@domain.com",
      "phoneNumber": "09123334455",
      "password": "matin123",
      "isAdmin": true
    },
    {
      "name": "usa gachkar",
      "lastname": "kargar",
      "email": "usagachkar@domain.com",
      "phoneNumber": "09123334455",
      "password": "matin123",
      "isAdmin": false
    },
    {
      "name": "hashem barqi",
      "lastname": "kargar",
      "email": "hashembarqi@domain.com",
      "phoneNumber": "09123334455",
      "password": "matin123",
      "isAdmin": false
    },
  ];

  auth = getAuth();



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private userService: UserService
  ) {

  }

  // get AppUser$(): Observable<AngularFireAction<DatabaseSnapshot<unknown>>> {
  //   return this.userService.user$.pipe(
  //     switchMap(user => {
  //       // if (user) return this.userService.getUser(user.uid);
  //       if (user) return this.userService.getUser(user.uid);
  //
  //       return new Observable<SnapshotAction<null>>();
  //     })
  //   )
  // }

  registerUser(user: UserModel) {
    user.email && user.password
      ? createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {displayName: user.name})
          .then(() => this.userService.saveUser(userCredential.user, user))
        return this.router.navigate(['landing']);
      })
      : null
  }

  loginUser(email?: string, password?: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl' || '');
    localStorage.setItem('returnUrl', <string>returnUrl)
    if (email != null && password != null) {
      return signInWithEmailAndPassword(this.auth,email, password).then((userCredential) => {
        // userCredential.user ? this.userService.isUserOwner(userCredential.user?.uid) : null;
        this.router.navigate([returnUrl || 'landing']);
      })
    }
    return false;
  }

  logout() {
    return signOut(this.auth);
  }

  deleteUser(user : User){
    return deleteUser(user)
  }
}
