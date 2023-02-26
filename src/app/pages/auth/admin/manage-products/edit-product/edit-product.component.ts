import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../../services/product.service";
import {ProductModel} from "../../../../models/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../../services/category.service";
import {finalize, takeUntil} from "rxjs";
import {Unsub} from "../../../../unsub";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends Unsub implements OnInit {

  id!: string | null;
  product!: ProductModel | null;
  productForm!: FormGroup;
  categories: string[] = [];
  loading: boolean = false;
  imagePreview!: string | undefined;
  file!: File | null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProductIDFormUrl();
    this.id === "new" ? this.fillProductFormGroup() : null;
    this.id ? this.getProduct(this.id) : null;
    this.getCategories();
  }

  onSelectProductPhoto(event: Event) {
    const reader = new FileReader();
    const files = (event.target as HTMLInputElement).files;
    this.file = files ? files[0] : null;
    this.productForm.patchValue({file: this.file});
    this.productForm.patchValue({fileName: this.file?.name});
    this.productForm.get('file')?.updateValueAndValidity();
    this.productForm.get('fileName')?.updateValueAndValidity();
    reader.onload = () => this.imagePreview = reader?.result?.toString();
    this.file ? reader.readAsDataURL(this.file) : null;

    console.log(this.imagePreview);

  }

  save() {
    this.loading = true;
    const newProduct: ProductModel = {
      id: this.productForm.get('id')?.value,
      title: this.productForm.get('title')?.value,
      price: this.productForm.get('price')?.value,
      category: this.productForm.get('category')?.value,
      imageUrl: this.productForm.get('imageUrl')?.value,
    }
    if (!this.productForm.get('file')?.value) {
      this.id === "new"
        ? this.productService.updateProduct(newProduct.id, newProduct)
        : this.id
          ? this.productService.updateProduct(this.id, newProduct)
          : null;
    } else {
      newProduct.file = this.productForm.get('file')?.value;
      newProduct.fileName = this.productForm.get('fileName')?.value;
      this.productService.deleteFileFromStorage(newProduct);
      this.productService.uploadProductPhotoToStorage(newProduct)
        .pipe(
          finalize(() => {
            this.productService.getStorageRefForSaving(newProduct)
              .getDownloadURL()
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(
                (downloadUrl) => {
                  newProduct.imageUrl = this.imagePreview = downloadUrl;
                  if (this.id === "new") {
                    this.productService.updateProduct(newProduct.id, newProduct);
                  } else {
                    this.id ? this.productService.updateProduct(this.id, newProduct) : null;
                  }
                })
            takeUntil(this.unsubscribe)
          })
        ).subscribe();
    }
    this.loading = false;
    // this.router.navigate(['/auth/admin/manage-products']);
  }

  delete() {
    if (!confirm(' Are you sure you want to delete this?')) return;
    const newProduct: ProductModel = {
      id: this.productForm.get('id')?.value,
      title: this.productForm.get('title')?.value,
      price: this.productForm.get('price')?.value,
      category: this.productForm.get('category')?.value,
      imageUrl: this.productForm.get('imageUrl')?.value,
    }
    newProduct.file = this.productForm.get('file')?.value
    newProduct.fileName = this.productForm.get('fileName')?.value
    this.productService.deleteFileFromStorage(newProduct);
    this.productService.deleteProduct(newProduct.id).catch(error => console.log(error));
    this.router.navigate(['/auth/admin/manage-products']).catch((error => console.log(error)));
  }

  private getProductIDFormUrl() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')
    this.id ? this.loading = false : this.loading = true

    if (this.id === "new") {
      this.product = {
        "id": "",
        "title": "",
        "category": "",
        "price": 0,
        "file": undefined,
      }
    }
  }

  private fillProductFormGroup(product?: ProductModel) {
    this.productForm = new FormGroup({
      id: new FormControl(product?.id, [Validators.required]),
      title: new FormControl(product?.title, [Validators.required]),
      price: new FormControl(product?.price, [Validators.required]),
      category: new FormControl(product?.category, [Validators.required]),
      imageUrl: new FormControl(product?.imageUrl),
      file: new FormControl(),
      fileName: new FormControl(),
    })
  }

  private getProduct(id: string) {
    this.loading = true;
    this.productService.getProduct(id).pipe(takeUntil(this.unsubscribe)).forEach(product => {
      product ? this.fillProductFormGroup(product) : null;
      this.product = product;
      this.loading = false
    }).catch(error => console.log(error));
  }

  private getCategories() {
    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe)).subscribe(cat => cat ? this.categories = Object.keys(cat) : null)
  }

}

