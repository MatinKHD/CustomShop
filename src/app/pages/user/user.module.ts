import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {AuthGuardService} from "../../services/auth-guard.service";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";

import {MatComponentModule} from "../mat-component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from './user.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';


@NgModule({

  declarations: [
    MyProfileComponent,
    UserComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatComponentModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService]
})
export class UserModule {
}
