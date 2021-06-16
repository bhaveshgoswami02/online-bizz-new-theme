import { Component, Input, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CartService } from '../../../services/cart.service';
import { CommonService } from '../../../../website/services/common.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product:any
  readMore:boolean = false
    constructor(public _themeService:ThemesManagerService,public cartService:CartService,public common:CommonService) { }
  
    ngOnInit(): void {
    }
  
    readMoreButton(){
      this.readMore = !this.readMore
    }
  
    addToCart(product){
      this.cartService.addProductToCart(product)
      // this.common.showToast("success","","Item Added Successful!")
      // console.log("allCart",this.cartService.getCart())
    }
  
    decrementProduct(product){
      this.cartService.decrementProductQty(product)
    }
    incrementProduct(product){
      this.cartService.incrementProductQty(product)
    }
  
    truncate(str, no_words) {
      return str.split(" ").splice(0, no_words).join(" ");
    }

    onProductTitleSelect(id) {
      console.log("product id",id)
      this._themeService.navigateTo('/product',{productId:id})
    }

  
  }
  