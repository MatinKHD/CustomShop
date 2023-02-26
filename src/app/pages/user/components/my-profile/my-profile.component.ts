import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize, takeUntil} from "rxjs";
import {Unsub} from "../../../unsub";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends Unsub implements OnInit {
  loading: boolean = false;
  saveLoading: boolean = false;
  isUserEditing: boolean = false;
  id!: string | null;
  user!: UserModel;
  editUserForm!: FormGroup;
  file!: File | null;
  imagePreview!: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUserIdFromUrl();
    this.fillEditUserForm();
    this.id ? this.getUser(this.id) : null;
  }

  onSelectPhoto(event: Event) {
    const fileReader = new FileReader()

    const files = (event.target as HTMLInputElement).files
    this.file = files ? files[0] : null;
    this.editUserForm.patchValue({file: this.file})
    this.editUserForm.patchValue({fileName: this.file?.name})
    this.editUserForm.get('file')?.updateValueAndValidity()
    this.editUserForm.get('fileName')?.updateValueAndValidity()

    fileReader.onload = () => this.imagePreview = fileReader?.result?.toString();
    this.file ? fileReader.readAsDataURL(this.file) : null;
  }

  save() {
    this.saveLoading = true;
    this.loading = true;
    const newUser: UserModel = {
      name: this.editUserForm.get('name')?.value,
      lastname: this.editUserForm.get('lastname')?.value,
      phoneNumber: this.editUserForm.get('phoneNumber')?.value,
      imageUrl: this.editUserForm.get('imageUrl')?.value,
      file: this.editUserForm.get('file')?.value,
      fileName: this.editUserForm.get('fileName')?.value,
    }
    this.updateUser(this.user, newUser);

    this.saveLoading = false;
    this.loading = false;


  }

  private updateUser(pureUser: UserModel, updatedProperties: UserModel) {
    this.editUserForm.get('file')?.value
      ? this.updateUserDatabaseAndStorage(pureUser, updatedProperties)
      : this.userService.updateUser(pureUser, updatedProperties)
    this.loading = false;
    this.saveLoading = false;
  }

  private updateUserDatabaseAndStorage(pureUser: any, updatedProperties: UserModel) {
    this.userService.deleteProfilePhotoFormStorage(pureUser);
    updatedProperties.file ? this.userService.uploadProfilePhotoToStorage(pureUser.id, updatedProperties.file)
      .pipe(
        finalize(() => {
          updatedProperties.file ? this.userService.getStorageRef(pureUser.id, updatedProperties.file)
            .getDownloadURL()
            .pipe(takeUntil(this.unsubscribe)).subscribe(
              (downloadUrl) => {
                updatedProperties.imageUrl = pureUser.imageUrl = this.imagePreview = downloadUrl;
                this.userService.updateUser(pureUser, updatedProperties)
              }) : null
        }),
        takeUntil(this.unsubscribe)
      ).subscribe() : null;
    this.loading = false;
    this.saveLoading = false;
  }

  private getUserIdFromUrl() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id ? this.loading = false : this.loading = true;
  }

  private getUser(id: string) {
    this.loading = true;
    this.userService.getUser(id).pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      this.loading = false;
      user ? this.user = user : null;
      user ? this.fillEditUserForm(user) : null;
    })
  }

  private fillEditUserForm(user?: UserModel) {
    this.editUserForm = new FormGroup({
      name: new FormControl(user?.name, [Validators.required]),
      lastname: new FormControl(user?.lastname, [Validators.required]),
      phoneNumber: new FormControl(user?.phoneNumber, [Validators.required]),
      imageUrl: new FormControl(user?.imageUrl),
      file: new FormControl(),
      fileName: new FormControl()
    })
  }
}
