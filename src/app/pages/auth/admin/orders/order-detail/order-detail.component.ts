import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CheckoutService} from "../../../../../services/checkout.service";
import {Unsub} from "../../../../unsub";
import {takeUntil} from "rxjs";
import {UserModel} from "../../../../models/user.model";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends Unsub implements OnInit {
  id!: string | null;
  user!: any;
  cartItems!: any;
  delivery!: any;
  totalPrice!: any;
  totalPriceForEachItem!: any;

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOrder();
  }

  private getOrder() {
    this.getOrderIdFromUrl();
    if (this.id)
      this.checkoutService.getOrder(this.id).pipe(takeUntil(this.unsubscribe)).subscribe(order => {
        this.user = order?.user;
        this.cartItems = order?.cart;

        this.delivery = order?.delivery;
      })
  }

  private getOrderIdFromUrl() {
    this.id = this.route.snapshot.paramMap.get('id')
  }
}
