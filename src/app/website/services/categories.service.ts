import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  collection = "categories"
  constructor(public db: AngularFirestore, public _themeService: ThemesManagerService) { }

  getAll(params) {
    if(params.superCategory) {
      // console.log("if run")
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.where("superCategoryId","==",params.superCategory).where("status", "==", true).orderBy("priority", "asc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    else
    {
      // console.log("else run")
      return this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.where("status", "==", true).orderBy("priority", "asc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
  }

  getAllBySuperCategoryAndOptions(params,option) {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.where("superCategoryId","==",params).where("superCategoryOption","==",option).where("status", "==", true).orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }
}
