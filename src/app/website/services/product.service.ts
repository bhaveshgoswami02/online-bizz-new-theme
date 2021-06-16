import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ThemesManagerService } from './themes-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collection = "products"

  constructor(public db:AngularFirestore, public _themeService:ThemesManagerService) { }

  getProducts(params){
    // // let collection="users/id/products"
    // // let query = this.db.collection(collection).ref
    // // .where("active", "==", true);
    // // if (params.subCategory) {
    // //   query = query.where("slug", "==", params.subCategory)
    // // }
    // // return this.db.collection(this.collection, ref => query.orderBy("sort", "asc")).get().pipe(
    // //   map(actions => actions.docs.map(a => {
    // //     const data = a.data() as any;
    // //     const id = a.id;
    // //     return { id, ...data };
    // //   }))
    // // )
    
    if(params.category) {
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection,ref=>ref.where("categories","array-contains",params.category)).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    if(params.brand) {
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection,ref=>ref.where("brandId","==",params.brand)).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    if(params.subCategory) {
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection,ref=>ref.where("subCategories","array-contains",params.subCategory)).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    if(params.key) {
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection,ref=>ref.where("tags","array-contains",params.key)).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    else
    {
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )

    }
  }

  getProductBySearch(key) {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection,ref=>ref.where("subCategories","array-contains",key.subCategory)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getSingleData(id) {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection).doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  
}
