export class UserModel {
  id?: string;
  name!: string;
  lastname!: string;
  email?: string;
  phoneNumber!: string;
  password?: string;
  isAdmin?: boolean;
  file?: File;
  fileName?: string;
  imageUrl?: string;

  constructor(file: File) {
    this.file = file
  }
}
