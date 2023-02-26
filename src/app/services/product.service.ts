import {Injectable} from '@angular/core';

import {ProductModel} from "../pages/models/product.model";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {deleteObject, getStorage, listAll, ref} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  storage = getStorage()

  constructor(
    private db: AngularFireDatabase,
    private AfStorage: AngularFireStorage
  ) {
  }

  getStorageRefForSaving(product: ProductModel) {
    return this.AfStorage.ref(`/products/${product.id}/${product.file?.name}`);
  }

  deleteFileFromStorage(product: ProductModel) {
    const productFolder = ref(this.storage,`/products/${product.id}`);
    let productImageName: string;
    listAll(productFolder).then(res =>{
      res.items.forEach(itemRef => productImageName = itemRef.name)
      let delRef = ref(this.storage,`/products/${product.id}/${productImageName}`)
      return deleteObject(delRef)
    })
  }

  uploadProductPhotoToStorage(product: ProductModel) {
    const filePath = `/products/${product.id}/${product.fileName}`;
    return this.AfStorage.upload(filePath, product.file).snapshotChanges();

  }

  products(): AngularFireObject<ProductModel> {
    return this.db.object(`/products`);
  }

  product(id: string): AngularFireObject<ProductModel> {
    return this.db.object(`/products/${id}`)
  }

  getProducts() {
    return this.products().valueChanges()
  }

  getProduct(pid: string) {
    return this.product(pid).valueChanges();
  }

  updateProduct(pid: string, product: ProductModel) {
    const databaseProduct: ProductModel = {
      id: product.id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      category: product.category,
    }
    this.product(pid).update(databaseProduct);
  }

  deleteProduct(pid: string) {
    return this.product(pid).remove()
  }
}
