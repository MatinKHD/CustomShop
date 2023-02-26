import {ProductModel} from "./product.model";


export interface ShoppingCartItemModel {
  product: ProductModel,
  quantity: number,
  totalPrice: number;
}
