import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {AuthGuardService} from "../../../services/auth-guard.service";
import {AdminAuthGuardService} from "../../../services/admin-auth-guard.service";
import {ManageProductsComponent} from "./manage-products/manage-products.component";
import {EditProductComponent} from "./manage-products/edit-product/edit-product.component";
import {OwnerAuthGuardService} from "../../../services/owner-auth-guard.service";
import {EditUserComponent} from "./manage-users/edit-user/edit-user.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderDetailComponent} from "./orders/order-detail/order-detail.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        pathMatch: 'full',
        canActivate: [OwnerAuthGuardService]

      },
      {
        path: 'manage-user/:id',
        component: EditUserComponent,
        pathMatch: 'full',
        canActivate: [OwnerAuthGuardService]

      },
      {
        path: 'manage-products',
        component: ManageProductsComponent,
        pathMatch: 'full',
        canActivate: [AdminAuthGuardService],
      },
      {
        path: 'manage-product/:id',
        component: EditProductComponent,
        pathMatch: 'full',
        canActivate: [AdminAuthGuardService],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        pathMatch: 'full',
        canActivate: [AdminAuthGuardService],
      },
      {
        path: 'order/:id',
        component: OrderDetailComponent,
        pathMatch: 'full',
        canActivate: [AdminAuthGuardService],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
