import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/website/services/categories.service';
import { SuperCategoriesService } from 'src/app/website/services/super-categories.service';
import { ThemesManagerService } from 'src/app/website/services/themes-manager.service';

@Component({
  selector: 'app-super-categories',
  templateUrl: './super-categories.component.html',
  styleUrls: ['./super-categories.component.scss']
})
export class SuperCategoriesComponent implements OnInit {
  allSuperCategories = []
  skeleton: boolean = true
  constructor(public _themeService: ThemesManagerService, public superCategoryService: SuperCategoriesService, public categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllSuperCategories()
  }

  viewAllProducts() {
    let path = '/products'
    this._themeService.navigateTo(path)
  }

  onCategorySelect(superCategorySlug) {
    let path = '/categories'
    let allCategories = []
    this.categoryService.getAll(superCategorySlug).subscribe(res => {
      allCategories = res
      if (allCategories.length == 0) {
        this._themeService.navigateTo("/products", { superCategory: superCategorySlug })
      }
      else {
        this._themeService.navigateTo(path, { superCategory: superCategorySlug })
      }
    })
  }

  getAllSuperCategories() {
    this.superCategoryService.getAll().subscribe(res => {
      this.allSuperCategories = res
      this.skeleton = false
      // console.log("all super categories",this.allSuperCategories)
    })
  }
}
