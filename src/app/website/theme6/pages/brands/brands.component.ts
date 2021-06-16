import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from 'src/app/website/services/themes-manager.service';
import { BrandsService } from '../../../services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  allBrands = []
  skeleton:boolean = true
  constructor(public brandSerivce:BrandsService,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands() {
    this.brandSerivce.getBrands().subscribe(res=>{
      this.allBrands = res
      this.skeleton = false
      // console.log("all brands",this.allBrands)
    })
  }

  onAllProducts() {
    let path = '/products'
    this._themeService.navigateTo(path)
  }

  onBrandSelect(brandSlug) {
    this._themeService.navigateTo("products",{brand:brandSlug})
  }
}