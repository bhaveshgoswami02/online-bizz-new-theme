import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CommonService } from '../../../../website/services/common.service';
import { ManageAddressService } from '../../../../website/services/manage-address.service';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-all-address',
  templateUrl: './all-address.component.html',
  styleUrls: ['./all-address.component.scss']
})
export class AllAddressComponent implements OnInit {
 allAddress = []
  constructor(public _themeService:ThemesManagerService,public addressService:ManageAddressService,public common:CommonService,public cartService:CartService) { }

  ngOnInit(): void {
    this.getAllAddress()
  }

  getAllAddress() {
    this.common.showLoader()
    this.addressService.getAll().subscribe(res=>{
      this.allAddress = res
      this.common.stopLoader()
    })
  }

  delete(id) {
    this.common.showLoader()
    this.addressService.delete(id).then(res=>{
      // this.common.showToast("success","","Deleted!")
    }).catch(err=>{
      // this.common.showToast("error","Error",err)
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  back() {
    this.common.back()
  }
}
