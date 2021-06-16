import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/website/services/categories.service';
import { ProductService } from 'src/app/website/services/product.service';
import { ThemesManagerService } from 'src/app/website/services/themes-manager.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyWords:string
  skeleton:boolean = true
  allData = []
  params:any = {}
  constructor(public _themeService: ThemesManagerService,public categoryService:CategoriesService) { }

  ngOnInit(): void {
    this.getAllData()
  }

  getAllData() {
    this.categoryService.getAll(this.params).subscribe(res=>{
      this.allData = res
      this.skeleton = false
    })
  }

  search(event) {
    let path = "/products"
    if(event.value) {
      let keyWords = event.value.toLocaleLowerCase( )
      this._themeService.navigateTo(path,{key:keyWords})
    }
    if(event.key == "Enter") {
      let keyWords = event.target.value.toLocaleLowerCase( )
      this._themeService.navigateTo(path,{key:keyWords})
    }
  }
  getCover(){
    if(this._themeService?.data?.themeCover){
      return "url('"+this._themeService?.data?.themeCover+"')"
    }
    else{
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }

  onSelectData(slug) {
    this._themeService.getSubCategories(slug).subscribe(res => {
      let subCategories = []
      subCategories = res
      if (subCategories.length == 0) {
        let path = '/products' 
        this._themeService.navigateTo(path,{superCategory:this.params.superCategory,category:slug})
      }
      else {
        let path = '/subCategories'
        this._themeService.navigateTo(path,{category:slug})
      }
    })
  }

  blankSearchField(searchText) {
    searchText.value = null
  }

}
