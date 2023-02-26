import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductComponent} from "./product.component";
import {MatComponentModule} from "../mat-component.module";


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatComponentModule
  ]
})
export class ProductModule {
}
