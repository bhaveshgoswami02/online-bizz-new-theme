import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  collection = "shipments"
  constructor(public db:AngularFirestore,public _themeService:ThemesManagerService) { }

  add(products,orderDetail) {
    // console.log("order detail",orderDetail)
    delete orderDetail.items
    products.forEach(item=>{
      let product = item.product
      let qty = item.qty
      let data = {qty,product:product,...orderDetail}
      // console.log("shipment data",data)
      this.db.collection("users").doc(this._themeService.id).collection(this.collection).add(data)
    })
  }

  getData() {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection,ref=>ref.where("customerId", "==", this._themeService.getCustomerData().mobileNumber).orderBy("timestamp","desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }


}
