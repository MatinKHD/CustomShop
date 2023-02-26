import {UserModel} from "./user.model";
import {ShoppingCartItemModel} from "./shopping-cart-item.model";

export interface OrdersModel {
  user: UserModel,
  cart: Array<ShoppingCartItemModel>,
  delivery: any,
  payment: any,
  date: Date
}
