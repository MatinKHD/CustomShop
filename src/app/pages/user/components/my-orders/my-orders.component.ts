import { Component, OnInit } from '@angular/core';
import {Unsub} from "../../../unsub";
import {UserService} from "../../../../services/user.service";
import {takeUntil} from "rxjs";
import {CheckoutService} from "../../../../services/checkout.service";
import {OrdersModel} from "../../../models/orders.model";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent extends Unsub implements OnInit {
  isDelivered: boolean = true;
  orders!: Array<OrdersModel>;
  constructor(
    private userService: UserService,
    private checkoutService: CheckoutService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOrder();
  }


  private getOrder() {
    this.checkoutService.getOrders().pipe(takeUntil(this.unsubscribe)).subscribe( orders => orders ? this.getUserOrders(orders): null)
  }

  private getUserOrders(orders: OrdersModel) {
    let uid = localStorage.getItem('uid');
    let _orders = Object.values(orders);
    let userOrders: Array<OrdersModel> = _orders.map(order => order.user.id === uid ? order : null)
    userOrders.map(order => console.log(order.cart))
    this.orders = userOrders;
  }

}
