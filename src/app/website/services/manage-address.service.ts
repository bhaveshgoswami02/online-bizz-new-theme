import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';
import { ManageCustomerService } from './manage-customer.service';

@Injectable({
  providedIn: 'root'
})
export class ManageAddressService {
  collection = "address"

  constructor(public db: AngularFirestore, public customerService: ManageCustomerService) {
  }

  add(data) {
    return this.db.collection("users").doc(this.customerService._themeService.id).collection("customer").doc(this.customerService.getCustomerData().mobileNumber).collection(this.collection).add(data)
  }

  update(id, content) {
    return this.db.collection("users").doc(this.customerService._themeService.id).collection("customer").doc(this.customerService.getCustomerData().mobileNumber).collection(this.collection).doc(id).update(content)
  }

  delete(id) {
    return this.db.collection("users").doc(this.customerService._themeService.id).collection("customer").doc(this.customerService.getCustomerData().mobileNumber).collection(this.collection).doc(id).delete()
  }

  getAll() {
    if (this.customerService.getCustomerData().mobileNumber) {
      return this.db.collection("users").doc(this.customerService._themeService.id).collection("customer").doc(this.customerService.getCustomerData().mobileNumber).collection(this.collection, ref => ref.orderBy("timestamp", "desc")).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  }

  getSingle(id) {
    if (this.customerService.getCustomerData().mobileNumber) {
      return this.db.collection("users").doc(this.customerService._themeService.id).collection("customer").doc(this.customerService.getCustomerData().mobileNumber).collection(this.collection).doc(id).valueChanges()
    }
  }

}
