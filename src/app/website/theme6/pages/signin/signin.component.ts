import { Component, OnInit, NgModuleFactory, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { CommonService } from '../../../../website/services/common.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isOtpSent: boolean = false
  sessionId = null
  loader: boolean = false
  params:any = {}
  

  constructor(public cart: CartService, public common: CommonService, public customerService: ManageCustomerService, public _themeService: ThemesManagerService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams()
  }


  getParams() {
    this.route.queryParams.subscribe(res=>{
      this.params = res
      console.log("signin params",this.params)
    })
  }

  sendOtp(data: NgForm) {
    this.loader = true
    // console.log("number", data.value.mobileNumber)
    this.customerService.mobileNumber = data.value.mobileNumber.toString()
    // localStorage.setItem("customerNumber", data.value.mobileNumber.toString())
    this.cart.sendOtp(data.value.mobileNumber).then((res: any) => {
      // console.log("sent otp response", res)
      if (res.Status == "Success") {
        this.isOtpSent = true
        this.sessionId = res.Details
        // this.common.showToast("success", "", "OTP Sent Successful!")
      }
      else {
        // this.common.showToast("error", "Error", "OTP Not Send!")
      }
      this.loader = false
    }).catch(err => {
      // console.log("err", err)
      // this.common.showToast("error", err.error.Status, err.error.Details)
      this.isOtpSent = false
      this.loader = false
    })
  }

  vertifyOtp(data: NgForm) {
    this.loader = true
    console.log("otpdata",data.value)
    var otpdata = data.value.otp1.concat(data.value.otp2).concat(data.value.otp3).concat(data.value.otp4).concat(data.value.otp5).concat(data.value.otp6);
    console.log("concateotpdata",otpdata)
    var otpvalue = { otp: otpdata}
    console.log("otpdata",data.value)
    data.value.sessionId = this.sessionId
    data.value.otp = otpdata
    this.cart.verifyOtp(data.value).toPromise().then((res: any) => {
      // console.log("verify otp response", res)
      if (res.Status == 'Success') {
        // this.common.showToast("success", "", "OTP Verification Successful!")
        this.customerService.isCustomerExist(this.params)
      }
      else {
        // this.common.showToast("error", res.Details, "")
      }
      this.loader = false
    }).catch(err => {
      // console.log(err)
      // // this.common.showToast("error", "Error", "OTP Not Match!")
      this.loader = false
    })
  }

  changeNumber() {
    this.isOtpSent = false
  }

  
 
  movetoNext(current, nextFieldID) {  
   /*  let data = current.value.maxLength */
   console.log("running", current)
    let data2 = current.maxLength
    console.log("running", nextFieldID)
    console.log("running22", data2,nextFieldID)
    if (1 >= 1) {  
      console.log("runningifff")
    document.getElementById(nextFieldID).focus();  
    }  
    } 

}
