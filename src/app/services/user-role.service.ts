import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";
import {RolesModel} from "../pages/models/roles.model";

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private db: AngularFireDatabase,) {
  }

  getRoles() {
    return this.roles().valueChanges();
  }

  addAdmin(uid: string) {
    return this.admins().update({[`${uid}`]: true});
  }

  removeAdmin(uid: string) {
    return this.admin(uid).remove();
  }

  private roles(): AngularFireObject<RolesModel> {
    return this.db.object(`/roles`);
  }

  private admins(): AngularFireObject<any> {
    return this.db.object(`/roles/admins`);
  }

  private admin(uid: string): AngularFireObject<any> {
    return this.db.object(`/roles/admins/${uid}`);
  }

}
