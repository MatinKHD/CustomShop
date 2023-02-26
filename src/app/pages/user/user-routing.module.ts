import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../services/auth-guard.service";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'my-profile/:name',
        component: MyProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
