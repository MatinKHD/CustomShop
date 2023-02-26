import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingRoutingModule} from "./pages-routing-routing.module";
import {FooterComponent} from "../core/layout/components/footer/footer.component";
import {LandingComponent} from './landing/landing.component';
import {LayoutComponent} from "../core/layout/layout.component";
import {MatComponentModule} from "./mat-component.module";
import {NgbComponentsModule} from "./ngb-components.module";
import {SharedModule} from "./shared/shared.module";
import {AuthService} from "../services/auth.service";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {UserService} from "../services/user.service";
import {UserRoleService} from "../services/user-role.service";
import {HeaderComponent} from "../core/layout/components/header/header.component";
import {CheckoutService} from "../services/checkout.service";


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingRoutingModule,
    NgbComponentsModule,
    MatComponentModule,
  ],
  providers: [
    AuthService,
    UserService,
    UserRoleService,
    ProductService,
    CategoryService,
    ShoppingCartService,
    CheckoutService,
  ]


})
export class LayoutModule {
}
