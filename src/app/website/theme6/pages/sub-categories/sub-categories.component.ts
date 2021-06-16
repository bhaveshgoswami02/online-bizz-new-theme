import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {
  category
  allSubCategories = []
  params
  skeleton:boolean = true
  
  constructor(public router: Router, public _themeService: ThemesManagerService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.category = this.route.snapshot.paramMap.get("category")
    this.route.queryParams.subscribe(params=>{
      // console.log(params)
      this.params=params
      this.category = this.params.category
      this.getSubCategories()
      // code to get products accourding to query
    })
    // console.log("category in sub category",this.category)
  }

  goOnProductPage(subCategorycategory?) {
    let path = '/products' 
    this._themeService.navigateTo(path,{category:this.category,subCategory:subCategorycategory})
  }

  getSubCategories() {
    this._themeService.getSubCategories(this.category).subscribe(res=>{
      this.allSubCategories = res
      this.skeleton = false
      // console.log("all subcategories",this.allSubCategories)
    })
  }

}
