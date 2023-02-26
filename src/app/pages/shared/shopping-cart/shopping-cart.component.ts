import {Component, OnInit} from '@angular/core';
import {Unsub} from "../../unsub";
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {takeUntil} from "rxjs";
import {ShoppingCartItemModel} from "../../models/shopping-cart-item.model";
import {ProductModel} from "../../models/product.model";
import {ShoppingCartsModel} from "../../models/shoppingCartsModel";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends Unsub implements OnInit {
  items!: any[];
  cart!: ShoppingCartsModel | null;
  itemPrice!: number;
  totalPrice!: any;
  totalPriceForEachItem!: Array<number>

  constructor(
    private cartService: ShoppingCartService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.getCart().catch(e => console.log(e))
  }

  removeItem(product: ProductModel) {
    this.cartService.removeItem(product)
      .then(() => this.items.length === 1 ? this.items.splice(0, 1) : null)
      .catch(e => console.log(e))
  }

  incrementQuantity(product: ProductModel) {
    this.cartService.addToCartOrIncrementQuantity(product)
  }

  decrementQuantity(product: ProductModel) {
    this.cartService.removeFormCartOrDecrementQuantity(product)
  }

  shopNow() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
    localStorage.setItem('totalPriceForEachItem', JSON.stringify(this.totalPriceForEachItem))
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
  }

  private async getCart() {
    (await this.cartService.getCart())
      .valueChanges()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((cart) => {
        cart && cart.items ? this.items = Object.values(cart.items) : null;
        this.cart = cart;
        this.totalPriceForEachItem = this.items?.reduce((r, a) => a.quantity > 0 ? r.concat(a.product.price * a.quantity) : [], [])
        this.totalPrice = this.totalPriceForEachItem?.reduce((r, a) => r + a, 0)
      })
  }

}
