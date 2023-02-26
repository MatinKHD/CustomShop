import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";
import {getAuth} from "@angular/fire/auth";
import {UserModel} from "../pages/models/user.model";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {deleteObject, getStorage, listAll, ref} from "@angular/fire/storage";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = getAuth()
  ownersId: any;
  user$: Observable<firebase.User | null>;
  storage = getStorage();

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage
  ) {
    this.user$ = this.afAuth.authState;
  }
  // working with angular fire database
  getUsers() {
    return this.users().valueChanges();
  }

  getUser(uid: string) {
    return this.user(uid).valueChanges();
  }

  saveUser(user: any, userInfo: UserModel) {
    let strPhoneNumber = userInfo.phoneNumber.toString()
    return this.user(user.uid)
      .update({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        lastname: userInfo.lastname,
        phoneNumber: strPhoneNumber,
        password: userInfo.password,
      })
  }

  updateUser(user: any , updatedUser: UserModel){
    const newUser: UserModel = {
      id: user?.id,
      name: updatedUser?.name,
      lastname: updatedUser?.lastname,
      email: user?.email,
      phoneNumber: updatedUser?.phoneNumber,
      password: user?.password,
      imageUrl: updatedUser?.imageUrl
    }
    this.user(user.id).update(newUser)
      .then(() => console.log("userUpdated successfully"))
      .catch(error => console.log(error))
  }

  private users(): AngularFireObject<UserModel> {
    return this.db.object("/users")
  }

  private user(uid: string): AngularFireObject<UserModel> {
    return this.db.object(`/users/${uid}`)
  }

  // working with angularfire storage

  getStorageRef(id: string,profilePhotoFile : File){
    return this.afStorage.ref(`users/users-profile-photo/${id}/${profilePhotoFile.name}`)
  }

  uploadProfilePhotoToStorage(id: string ,profilePhotoFile: File){
    const filePath = `/users/users-profile-photo/${id}/${profilePhotoFile.name}`;
    return this.afStorage.upload(filePath, profilePhotoFile).snapshotChanges();
  }

  deleteProfilePhotoFormStorage(user: UserModel){
    const userProfilePhotoFolderPath = ref(this.storage,`/users/users-profile-photo/${user.id}`);
    let userImageName: string;
    listAll(userProfilePhotoFolderPath).then(res => {
      res.items.forEach(itemRef => userImageName = itemRef.name)
      const delRef = ref(this.storage,`/users/users-profile-photo/${user.id}/${userImageName}`);

     userImageName ? deleteObject(delRef).catch(e => console.log(e)) : null;
    })
  }


}
