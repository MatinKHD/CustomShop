import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {UserModel} from "../pages/models/user.model";
import {ShoppingCartItemModel} from "../pages/models/shopping-cart-item.model";
import {OrdersModel} from "../pages/models/orders.model";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private db: AngularFireDatabase
  ) {
  }

  getOrders() {
    return this.orders().valueChanges();
  }

  getOrder(id : string) {
    return this.order(id).valueChanges();
  }

  registerOrder(id: string, userInfo: UserModel, cart: Array<ShoppingCartItemModel>, deliveryInfo: any, paymentInfo: any, orderDate: Date) {
    const data: OrdersModel = {
      user: userInfo,
      delivery: deliveryInfo,
      payment: paymentInfo,
      cart: cart,
      date: orderDate
    }
    this.db.list(`/orders`).push(data).catch(e => console.log(e))
  }

  private orders(): AngularFireObject<OrdersModel> {
    return this.db.object(`/orders`)
  }

  private order(id: string): AngularFireObject<OrdersModel> {
    return this.db.object(`/orders/${id}`)
  }
}
