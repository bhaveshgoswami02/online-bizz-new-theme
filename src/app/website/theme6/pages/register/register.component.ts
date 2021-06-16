import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase'
import { ManageCustomerService } from '../../../services/manage-customer.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loader:boolean = false
  constructor(public customer:ManageCustomerService,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    // if(!this.customer.mobileNumber) {
    //   this._themeService.navigateTo("/signin")
    // }
  }

  register(data:NgForm) {
    this.loader = true
    data.value.timestamp = firebase.firestore.Timestamp.now()
    data.value.mobileNumber = this.customer.mobileNumber
    // console.log(data.value)
    this.customer.add(data.value).then(res=>{
      this.loader = false
    }).catch(err=>{
      this.loader = false
    })
  }

}
