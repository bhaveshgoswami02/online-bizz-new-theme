import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { ManageAddressService } from '../../../../website/services/manage-address.service';
import { CommonService } from '../../../../website/services/common.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-single-address',
  templateUrl: './single-address.component.html',
  styleUrls: ['./single-address.component.scss']
})
export class SingleAddressComponent implements OnInit {
  loader:boolean = false
  params:any = {}
  constructor(public addressService:ManageAddressService,public common:CommonService,public router:Router,public _themeService:ThemesManagerService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams()
  }
  
  getParams() {
    this.route.queryParams.subscribe(res=>{
      this.params = res
    })
  }

  submit(data:NgForm) {
    this.loader = true
    let timestamp = firebase.firestore.Timestamp.now()
    data.value.timestamp = timestamp
    // console.log("data",data.value)
    if(!data.value.landmark) {
      data.value.landmark = ""
    }
    this.addressService.add(data.value).then(res=>{
      // this.common.showToast("success","","Added Successful")
      if(this.params.id){
        this._themeService.navigateTo('/checkout')
      }
      else
      {
        this._themeService.navigateTo('/all-address')
      }
    }).catch(err=>{
      // this.common.showToast("error","Error",err)
    }).finally(()=>{
      this.loader = false
    })
  }

}