import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartService } from '../../../services/cart.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CommonService } from '../../../../website/services/common.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';
import { ManageAddressService } from '../../../../website/services/manage-address.service';
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  submitted = false
  WindowRef: any
  paymentMode: string = ""
  orderSummary
  allAddress = []
  address = null
  couponCode = ""
  comment = ""
  isCommentTextarea: boolean = false
  addressId = ""
  constructor(
    public http: HttpClient,
    public zone: NgZone,
    public cartService: CartService, public theme: ThemesManagerService, public router: Router, public activatedRoute: ActivatedRoute, public common: CommonService, public customerService: ManageCustomerService, public addressService: ManageAddressService) { }

  ngOnInit(): void {
    this.WindowRef = this.WindowReference
    this.getAllAddress()
  }

  OrderNow() {
    this.submitted = true
    this.cartService.getOrderSummary()
    // create message template and send message

    let message = `
    Hi  ${this.theme.data.shopName} !!
(Link: ${this.theme.customDomain ? "https://" + this.theme.customDomain : environment.domain + this.theme.data.domainName} )

I have placed the following order  for ₹${this.cartService.total}. Please do the needful.

From,
${this.customerService.getCustomerData().name}

*Product Details*
`
    this.cartService.cart.forEach(element => {
      message = message + `
  1)   ${element.product.itemName}     (QTY ${element.qty})     ₹${element.product.itemPrice}     ₹${element.product.itemPrice * element.qty}
  `
    })
    message = message +
      `
*Total Item* : ${this.cartService.cart.length}
*Total SubTotal* : ₹${this.cartService.subTotal}
*Total Discount* : ₹${this.cartService.discount}
*Total Total* : ₹${this.cartService.total}
*Coupon Code* : ${this.cartService.appliedCouponcode ? this.cartService.appliedCouponcode : '-'}

*Order Delivery Note From ${this.customerService.getCustomerData().name}:*
${this.comment ? this.comment : '-'}

*Customer Details*
${this.customerService.getCustomerData().name}
${this.customerService.getCustomerData().mobileNumber}
${this.customerService.getCustomerData().email}
*Address* : ${this.address.street}
*City* : ${this.address.city}
*Pincode*: ${this.address.pincode}
*Landmark*: ${this.address.landmark}

*Business Details*
${this.theme.data.shopName}
${this.theme.data.phoneNo}
${this.theme.data.email}
${this.theme.data.address.area + ' ' + this.theme.data.address.city + ' ' + this.theme.data.address.state + ' ' + this.theme.data.address.zipCode}

Terms & Conditions
${this.theme.data.termsAndConditions}
    `
    /* this.router.navigateByUrl("order-successful") */
    this.router.navigate(['../order-successful'], { relativeTo: this.activatedRoute });
    setTimeout(() => {
      let url = "https://wa.me/" + this.theme.data.whatsappNo + "?text=" + encodeURIComponent(message)
      this.theme.openOutsideUrl(url)
      this.submitted = false
      this.removeAppliedCoupon()
      this.cartService.subTotal = 0
      this.cartService.discount = 0
      this.cartService.total = 0
    }, 800);
  }

  async placeOrder() {
    await this.cartService.getOrderSummary()
    this.submitted = true
    if (this.paymentMode == "cash") {
      if (!this.comment) {
        this.comment = ""
      }
      let data = { paymentMode: this.paymentMode, orderSummary: this.cartService.orderSummary, address: this.address, comment: this.comment }
      this.cartService.placeOrder(data).then(res => {
        this.router.navigateByUrl(this.theme.customDomain ? '/order-successful' : '/' + this.theme.domainName + '/order-successful')
      }).catch(err => {
        this.submitted = false
        // this.common.showToast("error", "", err)
      })
    }
    else {
      this.initiatePaymentModal()
    }
  }

  changesPaymentMode(paymentMode) {
    this.paymentMode = paymentMode
  }

  //------------------------------------ online payment mode ----------------------------------//
  async initiatePaymentModal() {

    let rzp1 = new this.WindowRef.Razorpay(await this.preparePaymentDetails());
    this.common.stopLoader()
    rzp1.open();
    event.preventDefault();
  }

  async preparePaymentDetails() {
    let razorpayOrderID = null;

    await this.generateRazorpayOrderId(this.cartService.total * 100).then((res: any) => {
      // console.log(res);
      razorpayOrderID = res.id;
    });
    // rzp_live_AROfsxzKrv1Gzx
    return {
      'key': this.theme.data.razorpay_key_id, // Enter the Key ID generated from the Dashboard
      'amount': this.cartService.total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      'currency': 'INR',
      'name': this.theme.data.shopName,
      'description': 'Complete Order',
      'image': this.theme.data.brand_logo,
      'order_id': razorpayOrderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      'handler': function (response) {
        // console.log(response);
        this.onPaymentSuccessful(response);
      }.bind(this),
      "prefill": {
        "email": this.customerService.getCustomerData().email,
        "contact": this.customerService.getCustomerData().mobileNumber,
      },
      'modal': {
        'ondismiss': function () {
          this.paymentFailed();
        }.bind(this),
      },
      'notes': {
        'address': this.theme.data.themeColors.shopName
      },
      'theme': {
        'color': this.theme.data.themeColors.primaryColor
      },
    };
  }

  generateRazorpayOrderId(amount) {
    //this.http.post('https://us-central1-orupool.cloudfunctions.net/createOrderTest' , {'amount':amount})
    return new Promise(resolve => {
      this.http.get('https://us-central1-splixcube-website-builder.cloudfunctions.net/createOrderId?' + this.getString({ 'amount': amount, razorpay_key_id: this.theme.data.razorpay_key_id, razorpay_key_secret: this.theme.data.razorpay_key_secret }))
        .subscribe(
          (data: any) => {
            resolve(data);
          })
    })
  }

  /*   async preparePaymentDetails() {
      return {
        'key': this.theme.data.razorpay_key_id, 
        'amount': this.cartService.getCartTotal() * 100, 
        'currency': 'INR',
        'name': 'Onlinebizz',
        'description': 'onlinebizz e-commerce',
        'image': '',
        //'order_id': razorpayOrderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        'handler': function (response) {
          console.log(response);
          this.onPaymentSuccessful(response);
        }.bind(this),
        "prefill": {
          // "email": localStorage.getItem("email"),
          "contact": localStorage.getItem("customerNumber"),
        },
        'modal': {
          'ondismiss': function () {
          }.bind(this),
        },
        'notes': {
          'address': ''
        },
        'theme': {
          // 'color': '#0EA852'
        }
      };
    } */

  // payment processing functions

  get WindowReference() {
    return window;
  }

  async onPaymentSuccessful(paymentids) {
    await this.cartService.getOrderSummary()
    let paymentDetail = paymentids
    if (!this.comment) {
      this.comment = ""
    }
    let data = { paymentDetail: paymentDetail, paymentMode: this.paymentMode, orderSummary: this.cartService.orderSummary, address: this.address, comment: this.comment }
    this.cartService.placeOrder(data).then(res => {
      this.zone.run(() => {
        this.router.navigateByUrl(this.theme.customDomain ? '/order-successful' : '/' + this.theme.domainName + '/order-successful')
      })
    }).catch(err => {
      // this.common.showToast("error", "", err)
    })
  }

  getString(o) {

    function iter(o, path) {
      if (Array.isArray(o)) {
        o.forEach(function (a) {
          iter(a, path + '[]');
        });
        return;
      }
      if (o !== null && typeof o === 'object') {
        Object.keys(o).forEach(function (k) {
          iter(o[k], path + '[' + k + ']');
        });
        return;
      }
      data.push(path + '=' + o);
    }

    var data = [];
    Object.keys(o).forEach(function (k) {
      iter(o[k], k);
    });
    return data.join('&');
  }

  paymentFailed() {
    this.zone.run(() => {
      this.submitted = false
    })
  }

  getAllAddress() {
    this.common.showLoader()
    this.addressService.getAll().subscribe(res => {
      this.allAddress = res
      this.common.stopLoader()
    })
  }

  selectAddress(address) {
    this.addressId = address.id
    this.address = address
    delete this.address.timestamp
    // console.log("address", this.address)
  }

  applyCoupon() {
    this.cartService.applyCoupon("", this.couponCode, "")
  }

  removeAppliedCoupon() {
    this.cartService.discount = 0
    this.cartService.appliedCouponcode = null
    this.cartService.couponDetails = null
  }

  onCommentCheck() {
    this.isCommentTextarea = !this.isCommentTextarea
  }

  onAddAddress() {
    this.theme.navigateTo('/single-address',{id:'add'})
  }
}
