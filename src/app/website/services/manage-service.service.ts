import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageServiceService {
  collection = "services"
  constructor(public db:AngularFirestore,public _themeService:ThemesManagerService) { }

  setServices() {
    this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

}
