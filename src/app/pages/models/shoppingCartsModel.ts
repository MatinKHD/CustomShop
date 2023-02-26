import {ShoppingCartItemModel} from "./shopping-cart-item.model";

export interface ShoppingCartsModel {
  dateCreated: string | undefined,
  items?: Array<ShoppingCartItemModel>
}
