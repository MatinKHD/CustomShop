import {Component, OnInit} from '@angular/core';
import {ShoppingCartsModel} from "../../../models/shoppingCartsModel";
import {Unsub} from "../../../unsub";
import {UserService} from "../../../../services/user.service";
import {takeUntil} from "rxjs";
import {UserModel} from "../../../models/user.model";
import {CheckoutService} from "../../../../services/checkout.service";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent extends Unsub implements OnInit {
  cartItems!: any[] | null;
  userDeliveryInformation!: any;
  paymentInformation!: any;
  totalPrice!: number;
  user!: UserModel | null;

  constructor(
    private userService: UserService,
    private checkoutService: CheckoutService,
    private shoppingCartService: ShoppingCartService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getCart();
    this.getDelivery();
    this.getPayment();
    this.getUser();
  }

  deletePaymentInformation() {
    localStorage.removeItem('payment');
  }

  orderConfirmed() {
    let id = localStorage.getItem('uid')
    let date = new Date;
    if (id && this.user && this.cartItems)
      this.checkoutService.registerOrder(id, this.user, this.cartItems, this.userDeliveryInformation, this.paymentInformation, date)
    this.shoppingCartService.clearCart()
      .then(() => console.log(`cart cleared successfully`))
      .catch(e => console.log(e))
    localStorage.removeItem('cart');
    localStorage.removeItem('cartId');
    localStorage.removeItem('payment');
    localStorage.removeItem('totalPrice')
    localStorage.removeItem('totalPriceForEachItem');
    localStorage.removeItem('userDeliveryInformation');
  }

  private getCart() {
    let JSONCart = localStorage.getItem('cart')
    let JSONTotalPrice = localStorage.getItem('totalPrice')
    this.totalPrice = JSONTotalPrice ? JSON.parse(JSONTotalPrice) : 0
    let cart: ShoppingCartsModel = JSONCart ? JSON.parse(JSONCart) : null;
    this.cartItems = cart.items ? Object.values(cart.items) : null;
  }

  private getDelivery() {
    let userDeliveryInformation = localStorage.getItem('userDeliveryInformation')
    this.userDeliveryInformation = userDeliveryInformation ? JSON.parse(userDeliveryInformation) : null;
  }

  private getPayment() {
    let payment = localStorage.getItem('payment');
    this.paymentInformation = payment ? JSON.parse(payment) : null;
  }

  private getUser() {
    let uid = localStorage.getItem('uid');
    if (uid) this.userService.getUser(uid).pipe(takeUntil(this.unsubscribe)).subscribe(user => this.user = user);
  }
}
