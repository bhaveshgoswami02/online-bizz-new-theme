import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  allData = []
  status = "pending"
  skeleton:boolean = true
  
  constructor(public _themeService:ThemesManagerService,public customerService:ManageCustomerService) { }

  ngOnInit(): void {
  }

  logout() {
    this.customerService.logoutCustomer()
  }

  getOrders(status) {
    this._themeService.getMyOrders(status).subscribe(res => {
      this.allData = res
      this.skeleton = false
      // console.log("allOrders", this.allData)
    })
  }

  goToOrderDetails(id) {
    let path = '/order'
    this._themeService.navigateTo(path, { id: id })
  }

  onFilter(status) {
    // console.log("filter",status);
    // console.log("before filter this.status",this.status);    
    this.skeleton = true
    if (this.status != status) {
      // console.log("if")
      this.getOrders(status)
      this.status = status
    }
    // console.log("after filter this.status",this.status);
  }

  onContinueShoping() {
    this._themeService.navigateTo('/products')
  }

  // showDropdown() {
  //   document.getElementById("dropdownMenuButton").classList.toggle("show");
  // }

}
