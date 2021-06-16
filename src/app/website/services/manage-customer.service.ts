import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ThemesManagerService } from '../services/themes-manager.service';
import { CommonService } from '../../website/services/common.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ManageCustomerService {

  collection = "customer"
  customerData
  mobileNumber: string = ""
  cart = []
  params:any = {}

  constructor(public db: AngularFirestore, public common: CommonService, public router: Router, public _themeService: ThemesManagerService) {
    this.getCustomerData()
  }

  getCustomerData() {
    this.customerData = JSON.parse(localStorage.getItem(this._themeService.id + "_customer"))
    return JSON.parse(localStorage.getItem(this._themeService.id + "_customer"))
  }

  getWebsiteData() {
    return this.db.collection("users").doc(this._themeService.id).valueChanges()
  }

  add(data) {
    this.common.showLoader()
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection).doc(data.mobileNumber).set(data).then(res => {
      // console.log("after customer register response", res)
      this.isCustomerExist()
      this.setUserDetail(data.mobileNumber)
      if (this.params.id) {
        this.router.navigateByUrl(this._themeService.customDomain ? '/cart' : '/' + this._themeService.domainName + '/cart')
      }
      else {
        this.router.navigateByUrl(this._themeService.customDomain ? '/home' : '/' + this._themeService.domainName + '/home')
      }
      // this.common.showToast("success", "", "Registration Successful!")
    }).catch(err => {
      // this.common.showToast("error", "", err)
    })
  }

  update(data) {
    this.common.showLoader()
    this.getCustomerData()
    let mobileNumber = this.customerData.mobileNumber
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection).doc(mobileNumber).update(data).then(res => {
      console.log("res after update", res)
      this.setUserDetail(mobileNumber)
      this.router.navigateByUrl(this._themeService.customDomain ? '/profile' : '/' + this._themeService.domainName + '/profile')
      // this.common.showToast("success", "", "Profile Update Successful!")
    }).catch(err => {
      // this.common.showToast("error", "", err)
    })
  }

  getAll() {
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.orderBy("timestamp", "desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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

  setUserDetail(mobileNumber) {
    this.getSingle(mobileNumber).subscribe(res => {
      localStorage.setItem(this._themeService.id + "_customer", JSON.stringify(res))
      this.getCustomerData()
    })
  }

  isCustomerExist(route?) {
    // console.log(this._themeService.id)
    // console.log(this.mobileNumber)
    console.log("route",route)
    this.params = route
    return this.db.collection("users").doc(this._themeService.id).collection(this.collection).doc(this.mobileNumber).get().subscribe(res => {
      if (res.exists) {
        this.db.collection("users").doc(this._themeService.id).collection(this.collection).doc(this.mobileNumber).get().pipe(
          map(a => {
            const data = a.data() as any;
            const id = a.id;
            return { id, ...data };
          })
        ).subscribe(res => {
          // console.log("customer Data", res)
          localStorage.setItem(this._themeService.id + "_customer", JSON.stringify(res))
          if (route.id) {
            this.router.navigateByUrl(this._themeService.customDomain ? '/cart' : '/' + this._themeService.domainName + '/cart')
          }
          else {
            this.router.navigateByUrl(this._themeService.customDomain ? '/home' : '/' + this._themeService.domainName + '/home')
          }
        })
      }
      else {
        this.router.navigateByUrl(this._themeService.customDomain ? '/register' : '/' + this._themeService.domainName + '/register')
      }
    })
  }

  logoutCustomer() {
    localStorage.removeItem(this._themeService.id + "_customer")
    this.customerData = null
    this.router.navigateByUrl(this._themeService.customDomain ? '/home' : '/' + this._themeService.domainName + '/home')
  }

  isCustomerLoggedIn() {
    if (this.getCustomerData()) {
      return true
    }
    else {
      return false
    }
  }

  getCart() {
    return this.cart = JSON.parse(localStorage.getItem(this._themeService.domainName + "cart"))
  }

}
