import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './product-card/product-card.component';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {MatComponentModule} from "../mat-component.module";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {RouterModule} from "@angular/router";
import { NavbarDropdownComponent } from './navbar-dropdown/navbar-dropdown.component';
import {NgbComponentsModule} from "../ngb-components.module";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    ProductCardComponent,
    ShoppingCartComponent,
    ProductQuantityComponent,
    NavbarDropdownComponent
  ],
  imports: [
    CommonModule,
    MatComponentModule,

    RouterModule,
  ],
    exports: [
        ProductCardComponent,
        ShoppingCartComponent,
        NavbarDropdownComponent
    ]
})
export class SharedModule {
}
