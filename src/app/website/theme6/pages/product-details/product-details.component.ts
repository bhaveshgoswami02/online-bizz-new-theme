import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/website/services/cart.service';
import { ManageCustomerService } from 'src/app/website/services/manage-customer.service';
import { ProductService } from 'src/app/website/services/product.service';
import { ThemesManagerService } from 'src/app/website/services/themes-manager.service';
import Swal from 'sweetalert2'
import { Swiper } from 'swiper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  params: any = {}
  data: any = {}
  skeleton:boolean = true
  pagination: any = false;
  defaultImage = "../../../../../assets/Images/category/category (5).jpg"
  thumbsSwiper: any;
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper;
  }

  constructor(public route: ActivatedRoute, public customerService: ManageCustomerService, public productService: ProductService, public cartService: CartService, public _themeService: ThemesManagerService) {
    // console.log("consrtuct")
    this.getParams()
  }

  ngOnInit(): void {
    // console.log("onit")
    this.getParams()
    
  }

  getParams() {
    // console.log("params before")
    this.route.queryParams.subscribe(res => {
      // console.log("params after", res)
      this.params = res
      // console.log("product params", this.params)
      this.getSingleData()
    })
  }

  getSingleData() {
    this.productService.getSingleData(this.params.productId).subscribe(res => {
      this.data = res
      this.skeleton = false
    })
  }

  addToCart(product) {
    this.cartService.addProductToCart(product)
    if (this.cartService.cart.length == 1) {
      Swal.fire({
        icon: 'success',
        title: 'Product Add Successful!',
        showConfirmButton: true,
        confirmButtonText:
          '<p class="primary-font-family">Ok</p>',
        footer: ``
      })
    }
  }

  onContinueShopping() {
    // console.log("on continue run")
    Swal.close()
  }

  viewCart() {
    this._themeService.navigateTo("/cart")
    // console.log("on view cart")
  }

  decrementProduct(product) {
    this.cartService.decrementProductQty(product)
  }

  incrementProduct(product) {
    this.cartService.incrementProductQty(product)
  }

  imagesClick(smallImg) {
    this.defaultImage = smallImg;

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
