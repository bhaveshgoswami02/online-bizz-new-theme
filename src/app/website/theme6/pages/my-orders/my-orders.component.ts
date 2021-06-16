import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  allData = []
  status = "pending"
  skeleton:boolean = true
  constructor(public _themeService: ThemesManagerService, public router: Router) { }

  ngOnInit(): void {
    this.getOrders(this.status)
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

