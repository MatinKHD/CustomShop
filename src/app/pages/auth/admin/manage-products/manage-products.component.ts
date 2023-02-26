import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {ProductService} from "../../../../services/product.service";
import {ProductModel} from "../../../models/product.model";
import {Unsub} from "../../../unsub";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent extends Unsub implements OnInit {
  productSource: Array<ProductModel> | null = [];
  fProductSource: Array<ProductModel> | null = [];
  loading: boolean = false;

  constructor(
    public authService: AuthService,
    private productService: ProductService,
  ) {
    super();
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().pipe(takeUntil(this.unsubscribe)).subscribe((product: ProductModel | null) => {
      let productInfo = product ? Object.values(product) : null;
      console.log(productInfo);
      this.productSource = this.fProductSource = productInfo;
      this.loading = false;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) this.fProductSource = this.productSource;
    else {
      if (this.productSource != undefined) {
        this.fProductSource = this.productSource?.filter(u => {
          return u.title.toLowerCase().includes(filterValue.toLowerCase())
        })
      }
    }
  }
}
