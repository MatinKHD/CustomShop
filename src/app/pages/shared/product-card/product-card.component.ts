import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: ProductModel | null;

  constructor(
    private cartService: ShoppingCartService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(product: ProductModel | null) {
    // product ? this.cartService.addToCart(product) : null;
  }
}
