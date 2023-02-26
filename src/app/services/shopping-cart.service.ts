import {Injectable} from '@angular/core';
import {ProductModel} from "../pages/models/product.model";
import {ShoppingCartsModel} from "../pages/models/shoppingCartsModel";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {ShoppingCartItemModel} from "../pages/models/shopping-cart-item.model";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCarts!: ShoppingCartsModel;


  constructor(
    private db: AngularFireDatabase,
  ) {
  }

  async getCart(): Promise<AngularFireObject<ShoppingCartsModel>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`)
  }

  addToCartOrIncrementQuantity(product: ProductModel) {
    this.updateCart(product, 1).catch(e => console.log(e))
  }

  removeFormCartOrDecrementQuantity(product: ProductModel) {
    this.updateCart(product, -1).catch(e => console.log(e))
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}`).remove().catch(e => console.log(e))
  }


  async removeItem(product: ProductModel) {
    return (await this.item(product.id)).remove()
  }

  private shoppingCart(): AngularFireList<ShoppingCartsModel> {
    return this.db.list(`/shopping-carts`)
  }

  private create() {
    let cartId = new Date().getTime().toString()
    return this.shoppingCart().push({
      dateCreated: cartId
    })
  }

  private async getOrCreateCartId() {
    try {
      let cartId: string | null = localStorage.getItem('cartId')
      if (!cartId) {
        let shoppingCart = await this.create();
        console.log(shoppingCart);
        shoppingCart.key ? localStorage.setItem('cartId', shoppingCart.key) : null;
        return shoppingCart.key
      }
      return cartId;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  private async item(productId: string): Promise<AngularFireObject<ShoppingCartItemModel>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`)
  }

  private async updateCart(product: ProductModel, change: number) {
    try {
      let item = await this.item(product.id);
      item.valueChanges().pipe(take(1))
        .subscribe(ite => {
          let data: ShoppingCartItemModel = {
            product: product,
            quantity: (ite?.quantity || 0) + change,
            totalPrice: ((ite?.quantity || 0) + change) * product?.price
          }
          if (ite?.quantity && ite?.quantity + change === 0) this.removeItem(ite.product)

          item.update(data);
        })
    } catch (err) {
      console.log(err);
    }
  }
}
