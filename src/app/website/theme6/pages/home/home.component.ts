import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CartService } from '../../../services/cart.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';
import { Router } from '@angular/router';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper/core';
import { BrandsService } from 'src/app/website/services/brands.service';
import { SuperCategoriesService } from '../../../services/super-categories.service';
import { CategoriesService } from 'src/app/website/services/categories.service';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, EffectFade, Autoplay, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  readMore: boolean = false
  openModalImg: string;

  constructor(
    public _themeService: ThemesManagerService,
    public cartService: CartService,
    public customerService: ManageCustomerService,
    public brandSerivce: BrandsService,
    public superCategoryService: SuperCategoriesService,
    public categoryService: CategoriesService,
    public router: Router
  ) {
    this.getAllBrands()
    this.getallSuperCategories()
    this.getAllCategories()
  }

  ngOnInit(): void {
    if (this._themeService.isBrowser) {
      this.customerService.getCustomerData()
    }
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }
  onSlideChange() {
    // console.log('slide change');
  }

  openModal(imgUrl) {
    this.openModalImg = imgUrl;
  }

  readMoreButton() {
    this.readMore = !this.readMore
  }

  getCover() {
    if (this._themeService?.data?.themeCover) {
      return "url('" + this._themeService?.data?.themeCover + "')"
    }
    else {
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }

  onSelectBrand(brandSlug) {
    let path = '/products'
    this._themeService.navigateTo(path, { brand: brandSlug })
  }

  viewAllBrands() {
    let path = '/brand'
    this._themeService.navigateTo(path)
  }

  getAllBrands() {
    // if (!this._themeService.data?.brands && this._themeService.data?.brands?.length == 0) {
    //   this.brandSerivce.getBrands().subscribe(res => {
    //     this._themeService.data.brands = res
    //   })
    // }
  }

  getallSuperCategories() {
    // if (!this._themeService.data?.supercategories && this._themeService.data?.supercategories?.length == 0) {
    //   this.superCategoryService.getAll().subscribe(res => {
    //     this._themeService.data.supercategories = res
    //     console.log("all super categories", this._themeService.data.supercategories)
    //   })
    // }
  }

  viewAllSuperCategories() {
    let path = '/super-categories'
    this._themeService.navigateTo(path)
  }

  onSelectSuperCategories(superCategorySlug) {
    this._themeService.data.categories.forEach(category => {
      if (category.superCategoryId == superCategorySlug) {
        let path = '/categories'
        this._themeService.navigateTo(path, { superCategory: superCategorySlug })
      }
      else {
        let path = '/products'
        this._themeService.navigateTo(path, { superCategory: superCategorySlug })
      }
    })
  }

  getAllCategories() {
    if (!this._themeService.data?.categories && this._themeService.data?.categories?.length > 0) {
      this.categoryService.getAll("").subscribe(res => {
        this._themeService.data.categories = res
        console.log("category data", this._themeService.data?.categories)
      })
    }
  }

  viewAllCategories() {
    let path = '/categories'
    this._themeService.navigateTo(path)
  }

  onSlideSelect(slide) {
    // if (slide.redirectPath) {
    //   let str = slide.redirectPath.substring(0, 1)
    //   if (str == '/') {
    //     this.router.navigateByUrl(this._themeService.customDomain ? '/' + slide.redirectPath : '/' + this._themeService.domainName + slide.redirectPath)
    //   }
    //   if (str == 'h') {
    //     this._themeService.openOutsideUrl(slide.redirectPath)
    //   }
    // }
    // console.log("slide", slide)
  }
  
  onSelectCategory(slug) {
    this._themeService.getSubCategories(slug).subscribe(res => {
      let subCategories = []
      subCategories = res
      if (subCategories.length == 0) {
        let path = '/products'
        this._themeService.navigateTo(path, { category: slug })
      }
      else {
        let path = '/subCategories'
        this._themeService.navigateTo(path, { category: slug })
      }
    })
  }

  // show(data) {
  //   console.log("data",data)
  // }

  controlledSwiper: any;
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }
  thumbsSwiper: any;
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper;
  }
}
