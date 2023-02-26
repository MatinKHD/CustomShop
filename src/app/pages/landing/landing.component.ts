import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {ProductModel} from "../models/product.model";
import {Unsub} from "../unsub";
import {takeUntil} from "rxjs";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent extends Unsub implements OnInit {
  products: ProductModel[] = [];
  CFProducts: ProductModel[] = [];
  FProducts: ProductModel[] = [];
  categories: any[] = [];
  category!: string | null;
  loading: boolean = false;

   constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {
     super();
   }


  ngOnInit(): void {
    this.getCategoryFromUrl();
    this.getProducts();
    this.getCategories();
  }

  applyFilter(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    value
      ? this.FProducts = this.products.filter(p => p.title.toLowerCase().includes(value.toLowerCase()))
      : this.FProducts = this.FProducts = this.products
  }

  private getCategoryFromUrl() {
    this.route.queryParamMap.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
      this.category = params.get('category');
      this.category
        ? this.CFProducts = this.FProducts = this.products.filter(p => p.category === this.category)
        : this.CFProducts = this.FProducts = this.products
    })
  }

  private getProducts() {
    this.loading = true
    this.productService.getProducts().pipe(takeUntil(this.unsubscribe)).subscribe((product) => {
      product ? this.FProducts = this.products = Object.values(product) : null
      this.loading = false
    })
  }

  private getCategories() {
    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe)).subscribe(categories => categories ? this.categories = Object.keys(categories) : null)
  }
}
