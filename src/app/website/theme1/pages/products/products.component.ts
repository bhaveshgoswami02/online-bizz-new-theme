import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  readMore:boolean = false
  products = []
  constructor(
    public _themeService:ThemesManagerService
  ) { }

  ngOnInit(): void {
    // this._themeService.getProducts().subscribe(res=>{
    //   this.products = res
    // })
  }

  readMoreButton(){
    this.readMore = !this.readMore
  }

  getCover(){
    if(this._themeService?.data?.themeCover){
      return "url('"+this._themeService?.data?.themeCover+"')"
    }
    else{
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }

}
