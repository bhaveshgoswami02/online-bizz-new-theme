import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoriesService} from '../../../services/categories.service';
import { SuperCategoriesService } from 'src/app/website/services/super-categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  allCategories = []
  params:any = {}
  singleSuperCategoryData:any
  superCategoryOptions = []
  allSelectedTabsCategories = []
  selectedTab:any = {}
  skeleton:boolean = true
  constructor(public _themeService: ThemesManagerService, public router: Router, public route:ActivatedRoute, public categoryService:CategoriesService,public superCategoryService:SuperCategoriesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res=>{
      this.params=res
      // console.log("params",this.params)
      this.getAllCategories()
    })
  }

  getSingleSuperCategory() {
    this.superCategoryService.getSingle(this.params.superCategory).subscribe(res=>{
      this.superCategoryOptions = res?.options
      this.selectedTab = this.superCategoryOptions[0]
      this.getSelectedTabData()
      console.log("superCategoryOptions",this.superCategoryOptions)
    })
  }

  getSelectedTabData() {
    this.allSelectedTabsCategories = this.allCategories.filter(category=> category.superCategoryOption == this.selectedTab.title)
    console.log("allSelectedTabsCategories",this.allSelectedTabsCategories)
  }

  getAllCategories() {
    this.categoryService.getAll(this.params).subscribe(res=>{
      this.allCategories = res
      console.log('all categories',this.allCategories)
      console.log('is superCategory',this.params.superCategory)
      this.skeleton = false
      if(this.params.superCategory) {
        this.getSingleSuperCategory()
      }
    })
  }

  onCategorySelect(slug) {
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

  onAllProducts() {
    let path = '/products'
    this._themeService.navigateTo(path)
  }

  onSelectTab(tab) {
    this.selectedTab = tab
    this.getSelectedTabData()
  }
  
}
