import {AdminsModel} from "./admins.model";


export interface RolesModel {
  owners: {
    uid: boolean
  },
  admins: AdminsModel
}
