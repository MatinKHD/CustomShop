import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";
import {CategoryModel} from "../pages/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private db: AngularFireDatabase
  ) {
  }
  categories() : AngularFireObject<CategoryModel>{
    return  this.db.object('/categories')
  }
  getCategories() {
    return this.categories().valueChanges();
  }
}


