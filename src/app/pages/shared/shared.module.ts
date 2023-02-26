import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './product-card/product-card.component';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {MatComponentModule} from "../mat-component.module";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {RouterModule} from "@angular/router";
import { NavbarDropdownComponent } from './navbar-dropdown/navbar-dropdown.component';


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
        RouterModule
    ],
    exports: [
        ProductCardComponent,
        ShoppingCartComponent,
        NavbarDropdownComponent
    ]
})
export class SharedModule {
}
