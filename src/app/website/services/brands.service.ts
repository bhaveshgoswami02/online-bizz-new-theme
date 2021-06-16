import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  collection = "brands"
  constructor(public db:AngularFirestore,public _themeService:ThemesManagerService) { }

  getBrands() {
    return this.db.collection("users").doc(this._themeService.data.id).collection(this.collection, ref => ref.orderBy("priority", "asc").where("status","==",true)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

}
