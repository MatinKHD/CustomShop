import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../services/auth-guard.service";
import {CheckoutComponent} from "./checkout.component";
import {DeliveryComponent} from "./components/delivery/delivery.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ConfirmationComponent} from "./components/confirmation/confirmation.component";
import {OrderConfirmedComponent} from "./components/order-confirmed/order-confirmed.component";
import {ReviewCartComponent} from "./components/review-cart/review-cart.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: CheckoutComponent,
    children: [
      {
        path: 'review-cart',
        component: ReviewCartComponent,
        pathMatch: 'full'
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        pathMatch: 'full'
      },
      {
        path: 'payment',
        component: PaymentComponent,
        pathMatch: 'full'
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        pathMatch: 'full',
      },
      {
        path: 'order-confirmed',
        component: OrderConfirmedComponent,
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
