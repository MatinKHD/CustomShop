import {Component, OnInit} from '@angular/core';
import {CheckoutService} from "../../../../services/checkout.service";
import {takeUntil} from "rxjs";
import {Unsub} from "../../../unsub";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends Unsub implements OnInit {
  orders!: any;
  date: Date = new Date();

  constructor(
    private checkoutService: CheckoutService,
  ) {
    super();
    this.getOrders();
  }

  ngOnInit(): void {
  }

  private getOrders() {
    this.checkoutService.getOrders().pipe(takeUntil(this.unsubscribe)).subscribe(orders => {
      this.orders = orders ? Object.entries(orders) : null;
      console.log(this.orders);
    })
  }

}
