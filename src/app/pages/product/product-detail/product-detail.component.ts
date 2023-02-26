import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {ProductModel} from "../../models/product.model";
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {takeUntil} from "rxjs";
import {Unsub} from "../../unsub";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends Unsub implements OnInit {
  id!: string | null;
  loading: boolean = false;
  product!: ProductModel | null;
  quantity!: number | undefined;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProductIdFromUrl();
    this.getProduct();
  }

  addToCart() {
    let demoProduct: ProductModel = {
      id: '',
      title: '',
      category: '',
      imageUrl: '',
      price: 0,
    };

    let product = this.product ? this.product : demoProduct

    this.cartService.addToCartOrIncrementQuantity(product)
  }

  removeFormCart() {
    let demoProduct: ProductModel = {
      id: '',
      title: '',
      category: '',
      imageUrl: '',
      price: 0,
    };
    let product = this.product ? this.product : demoProduct
    this.cartService.removeFormCartOrDecrementQuantity(product)
  }

  async getQuantity() {
    (await this.cartService.getCart()).valueChanges().pipe(takeUntil(this.unsubscribe)).subscribe((cart) => {
      let itemsEntries = cart?.items ? Object.entries(cart?.items) : null;
      itemsEntries?.map(item => {
        if (item[0] === this.id) this.quantity = item[1].quantity;
      })
    })
  }

  private getProductIdFromUrl() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id ? this.loading = false : this.loading = true;
  }

  private getProduct() {
    this.loading = true;
    this.id ?
      this.productService.getProduct(this.id).pipe(takeUntil(this.unsubscribe)).subscribe(product => {
        this.getQuantity().catch(e => console.log(e))
        console.log(this.quantity);
        this.loading = false;
        this.product = product;
      })
      : null
  }
}
