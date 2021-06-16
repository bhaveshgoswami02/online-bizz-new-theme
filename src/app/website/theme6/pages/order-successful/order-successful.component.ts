import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-order-successful',
  templateUrl: './order-successful.component.html',
  styleUrls: ['./order-successful.component.scss']
})
export class OrderSuccessfulComponent implements OnInit {

  constructor(public cartService: CartService, public router: Router,public customerService:ManageCustomerService,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    if (this.cartService.cart.length == 0) {
      //this.router.navigateByUrl("../home")
    }
    setTimeout(() => {
      this.cartService.clearCart()
    }, 2000);
  }

  goTo() {
    this._themeService.navigateTo('/home')
  }
}
