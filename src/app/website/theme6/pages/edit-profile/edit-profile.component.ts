import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/website/services/common.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  loader:boolean = false
  customerData = {name:null,email:null,mobileNumber:null,dob:null}
  constructor(public customerservice:ManageCustomerService,public common:CommonService) { }

  ngOnInit(): void {
    this.getCustomerDetail()
  }

  submit(data:NgForm) {
    // console.log("user profile update data",data.value)
    this.customerservice.update(data.value)
  }

  getCustomerDetail() {
    let mobileNumber = this.customerservice.customerData.mobileNumber
    this.customerservice.getSingle(mobileNumber).subscribe((res:any)=>{
      this.customerData = res
      console.log("customer Data",this.customerData)
      localStorage.setItem(this.customerservice._themeService.id + "_customer", JSON.stringify(res))
      this.customerservice.getCustomerData()      
    })
  }

  back() {
    this.common.back()
  }

}
