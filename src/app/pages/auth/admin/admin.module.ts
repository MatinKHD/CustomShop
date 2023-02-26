import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {AdminComponent} from "./admin.component";
import {ManageProductsComponent} from './manage-products/manage-products.component';
import {EditProductComponent} from './manage-products/edit-product/edit-product.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AdminAuthGuardService} from "../../../services/admin-auth-guard.service";
import {OwnerAuthGuardService} from "../../../services/owner-auth-guard.service";
import {EditUserComponent} from './manage-users/edit-user/edit-user.component';
import {MatComponentModule} from "../../mat-component.module";
import {SharedModule} from "../../shared/shared.module";
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';


@NgModule({
  declarations: [
    AdminComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    EditProductComponent,
    EditUserComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatComponentModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    OwnerAuthGuardService,
    AdminAuthGuardService,
  ]
})
export class AdminModule {
}
