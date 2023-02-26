import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {MatComponentModule} from "../mat-component.module";
import {NgbComponentsModule} from "../ngb-components.module";
import {DeliveryComponent} from './components/delivery/delivery.component';
import {PaymentComponent} from './components/payment/payment.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import { ReviewCartComponent } from './components/review-cart/review-cart.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    CheckoutComponent,
    DeliveryComponent,
    PaymentComponent,
    ConfirmationComponent,
    ProgressBarComponent,
    OrderConfirmedComponent,
    ReviewCartComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatComponentModule,
    NgbComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class CheckoutModule {
}
