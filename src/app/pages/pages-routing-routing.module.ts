import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {LayoutComponent} from "../core/layout/layout.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'landing',
      },
      {
        path: 'landing',
        component: LandingComponent,
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import(`./user/user.module`).then(m => m.UserModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('../pages/auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: 'product', loadChildren: () => import('../pages/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'checkout', loadChildren: () => import('../pages/checkout/checkout.module').then((m) => m.CheckoutModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],

})
export class PagesRoutingRoutingModule {
}
