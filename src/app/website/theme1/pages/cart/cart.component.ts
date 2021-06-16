import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService:CartService,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    console.log(this.cartService.cart)
  }

  removeItemFromCart(product){
    this.cartService.removeProductFromCart(product)
  }


}
