import { Injectable } from '@angular/core';
import { ThemesManagerService } from '../services/themes-manager.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ManageCustomerService } from './manage-customer.service';
import { CommonService } from '../../website/services/common.service';
import { map } from 'rxjs/operators';
import { ShipmentService } from './shipment.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = []
  subTotal
  couponDetails:any
  orderSummary
  couponCode = "splixcube"
  discount:number = 0
  total:number = 0
  appliedCouponcode = null
  constructor(public theme: ThemesManagerService, public http: HttpClient, public common: CommonService, public db: AngularFirestore, public router: Router,public customerService:ManageCustomerService,public shipmentService:ShipmentService) {
    if(this.theme.isBrowser){
      this.setCart()
    }
  }

  addProductToCart(product) {
    this.cart.push({ product: product, qty: 1 })
    this.updateLocalStorage()
  }

  removeProductFromCart(product) {
    this.cart = this.cart.filter(element => {
      if (element.product.id == product.id) {
        return false
      } else {
        return true
      }
    })
    this.updateLocalStorage()
  }

  incrementProductQty(product) {
    this.cart.forEach(element => {
      if (element.product.id == product.id) {
        element.qty++
      }
    })
    this.updateLocalStorage()
  }
  decrementProductQty(product) {
    // console.log(product)
    // console.log(this.cart)
    this.cart.forEach(element => {
      if (element.product.id == product.id) {
        element.qty--
        if (element.qty == 0) {
          this.removeProductFromCart(product)
        }
      }
    })
    this.updateLocalStorage()
  }
  clearCart() {
    this.cart = []
    this.updateLocalStorage()
  }
  updateLocalStorage() {
    localStorage.setItem(this.theme.domainName + "cart", JSON.stringify(this.cart))
  }

  setCart() {
    if (localStorage.getItem(this.theme.domainName + "cart")) {
      this.cart = JSON.parse(localStorage.getItem(this.theme.domainName + "cart"))
    } else {
      this.cart = []
      this.updateLocalStorage()
    }
  }
  getCart() {
    return this.cart
  }

  getProductSnapshotInCart(product) {
    let cartProduct = false
    this.cart.forEach(element => {
      if (element.product == product) {
        cartProduct = element
      }
    })
    return cartProduct
  }

  isProductInCart(product) {
    // console.log("product",product)
    let result = false
    this.cart.forEach(element => {
      // console.log("elemnt",element)
      if (element.product.id == product.id || element.product.id == product.productId) {
        result = element
      }
    })
    return result
  }

  getCartTotal() {
    let total = 0;
    this.cart.forEach(element => {
      let amount = element.product.itemPrice * element.qty
      total = total + amount
    })
    return total
  }

  sendOtp(number) {
    let api = environment.twoFactorApi
    return this.http.get('https://2factor.in/API/V1/' + api + '/SMS/' + number + '/AUTOGEN').toPromise()
  }

  verifyOtp(data) {
    let api = environment.twoFactorApi
    return this.http.get('https://2factor.in/API/V1/' + api + '/SMS/VERIFY/' + data.sessionId + '/' + data.otp)
  }

  async placeOrder(data) {
    this.common.showLoader()
    let timestamp = firebase.firestore.Timestamp.now()
    let customer = this.customerService.getCustomerData()
    let customerId = this.customerService.customerData.mobileNumber
    let orderId = await this.generateOrderId()
    if (!data.paymentDetail) {
      data.paymentDetail = ""
    }
    let allData = { items: this.cart, timestamp: timestamp, customer: customer, status: "pending", customerId: customerId, couponDetails: this.couponDetails, orderId: orderId, ...data }
    if (!allData.couponDetails) {
      allData.couponDetails = ""
    }
    // console.log("data", allData)
    return this.db.collection("users").doc(this.theme.id).collection("orders").add(allData).then(res => {
      this.shipmentService.add(this.cart,allData)
      this.subTotal = 0
      this.discount = 0
      this.total = 0
      this.appliedCouponcode = ""
      this.couponDetails = ""
      this.orderSummary = ""
      this.router.navigateByUrl(this.theme.customDomain ? '/order-successful' : '/' + this.theme.domainName + '/order-successful')
    }).catch(err => {
      // this.common.showToast("error", "", err)
    })
  }

  applyCoupon(cart, couponCode, customer) {
    this.common.startThemeLoader()
    if (couponCode) {
      return this.getCouponByCode(couponCode).subscribe(couponDetails => {
        this.couponDetails = couponDetails[0]
        if (this.couponDetails) {
          this.subTotal = this.getCartTotal()
          let timestamp = firebase.firestore.Timestamp.now()
          let endDate: any = new Date(this.couponDetails.endDate)
          let startDate: any = new Date(this.couponDetails.startDate)
          if (endDate >= timestamp.toDate() && startDate <= timestamp.toDate()) {
            if (this.subTotal >= this.couponDetails.minimumOrder && this.subTotal <= this.couponDetails.maximumOrder) {
              if (this.couponDetails.type == 'Fixed') {
                this.discount = this.couponDetails.amount
              }
              else {
                this.discount = this.subTotal * this.couponDetails.amount / 100
              }
              this.appliedCouponcode = this.couponDetails.code
              this.total = this.subTotal - this.discount
              this.orderSummary = { subTotal: this.subTotal, discount: this.discount, total: this.total, couponCode: this.appliedCouponcode }
              // console.log("final order summary", this.orderSummary)
            }
            else {
              if (this.subTotal <= this.couponDetails.minimumOrder) {
                alert(`This coupon applied on minimum order ${this.couponDetails.minimumOrder}`)
              }
              else {
                alert(`This coupon is applied less then ${this.couponDetails.maximumOrder}`)
              }
            }
          }
          else {
            if (startDate >= timestamp.toDate()) {
              alert(`this coupon valid from ${this.couponDetails.startDate}`)
            }
            else {
              alert("Coupon expired!")
            }
          }
          this.common.stopThemeLoader()
        }
        else {
          alert("Coupon is invalid!")
          this.common.stopThemeLoader()
        }
      })
    }
  }

  getCouponByCode(code) {
    return this.db.collection("users").doc(this.theme.id).collection("coupon", ref => ref.where("code", "==", code).where("status", "==", true)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getOrderSummary() {
    this.subTotal = this.getCartTotal()
    this.discount = this.discount
    this.total = this.subTotal - this.discount
    this.orderSummary = { subTotal: this.subTotal, discount: this.discount, total: this.total, couponCode: this.appliedCouponcode }
  }

  generateOrderId() {
    var orderId = "";
    var possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possible2 = "0123456789";
    for (var i = 0; i < 3; i++)
      orderId += possible1.charAt(Math.floor(Math.random() * possible1.length));
    for (var i = 0; i < 3; i++)
      orderId += possible2.charAt(Math.floor(Math.random() * possible2.length));
    return orderId;
  }

}
