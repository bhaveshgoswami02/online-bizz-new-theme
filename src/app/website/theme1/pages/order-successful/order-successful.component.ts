import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-order-successful',
  templateUrl: './order-successful.component.html',
  styleUrls: ['./order-successful.component.scss']
})
export class OrderSuccessfulComponent implements OnInit {

  constructor(public cartService:CartService,public router:Router) { }

  ngOnInit(): void {
    if(this.cartService.cart.length==0){
      //this.router.navigateByUrl("../home")
    }
    setTimeout(() => {
      this.cartService.clearCart()
    }, 2000);
  }

}
