import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartService } from '../../../services/cart.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(public cartService: CartService, public theme: ThemesManagerService, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log("checkout",this.cartService.cart)
  }



  OrderNow(orderForm) {
    // create message template and send message
    let message = `
    Hi  ${this.theme.data.shopName} !!
(Link: ${this.theme.customDomain ? "https://" + this.theme.customDomain : environment.domain + this.theme.data.domainName} )

I have placed the following order  for ₹${this.cartService.getCartTotal()}. Please do the needful.

From,
${orderForm.value.name}

*Product Details*
`
    this.cartService.cart.forEach(element => {
      message = message + `
  1)   ${element.product.itemName}     (QTY ${element.qty})     ₹${element.product.itemPrice}     ₹${element.product.itemPrice * element.qty}
  `
    })
    message = message +
      `
*Total Item* : ${this.cartService.cart.length}
*Total Price* : ₹${this.cartService.getCartTotal()}

*Order Delivery Note From ${orderForm.value.name}:*
${orderForm.value.comment}

*Customer Details*
${orderForm.value.name}
${orderForm.value.phoneNumber}
${orderForm.value.email}
${orderForm.value.address}

*Business Details*
${this.theme.data.shopName}
${this.theme.data.phoneNo}
${this.theme.data.email}
${this.theme.data.address.area + ' ' + this.theme.data.address.city + ' ' + this.theme.data.address.state + ' ' + this.theme.data.address.zipCode}

Terms & Conditions
${this.theme.data.termsAndConditions}
    `
    /* this.router.navigateByUrl("order-successful") */
    this.router.navigate(['../order-successful'], { relativeTo: this.activatedRoute });
    setTimeout(() => {
      let url = "https://wa.me/" + this.theme.data.whatsappNo + "?text=" + encodeURIComponent(message) 
      this.theme.openOutsideUrl(url);
    }, 800);
  }


}
