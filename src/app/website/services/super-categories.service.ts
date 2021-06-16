import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperCategoriesService {
  collection = "supercategories"
  constructor(public db: AngularFirestore, public _themeService: ThemesManagerService) { }

  getAll() {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.orderBy("priority", "asc").where("status", "==", true)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getSingle(id) {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection).doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

}
