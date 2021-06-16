import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { ProductService } from '../../../services/product.service';
import { CommonService } from 'src/app/website/services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  readMore:boolean = false
  products = []
  params={}
  skeleton:boolean = true
  constructor(
    public _themeService:ThemesManagerService,
    public productService:ProductService,
    public route:ActivatedRoute,
    public common:CommonService
  ) { }

  ngOnInit(): void {
    // this._themeService.getProducts().subscribe(res=>{
    //   this.products = res
    // })
    this.route.queryParams.subscribe(params=>{
      // console.log(params)
      this.params=params
      this.getData()
      // code to get products accourding to query
    })
  }

  getData(){
    this.skeleton = true
    this.productService.getProducts(this.params).subscribe(products=>{
      this.products = products
      this.skeleton = false
      // console.log("products",this.products)
    })
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
