import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  constructor(public cartService:CartService,public _themeService:ThemesManagerService,public customerService:ManageCustomerService) { }

  ngOnInit(): void {
  }

  removeItemFromCart(product){
    this.cartService.removeProductFromCart(product)
  }

  onCheckout() {
    if(this.customerService.getCustomerData()) {
      this._themeService.navigateTo("/checkout")
    }
    else
    {
      this._themeService.navigateTo("/signin",{id:"cart-signin"})
    }
  }

}
