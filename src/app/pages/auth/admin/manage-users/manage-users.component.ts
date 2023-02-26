import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {Unsub} from "../../../unsub";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent extends Unsub implements OnInit {
  userSource: Array<UserModel> | null = [];
  fUserSource: Array<UserModel> | null = [];
  loading: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(user => {
      let usersInfo = user ? Object.values(user) : null;
      this.userSource = this.fUserSource = usersInfo;
      this.loading = false;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) this.fUserSource = this.userSource;
    else {
      if (this.userSource != undefined) {
        this.fUserSource = this.userSource?.filter(u => u.email?.toLowerCase().includes(filterValue.toLowerCase()))
      }
    }
  }
}
