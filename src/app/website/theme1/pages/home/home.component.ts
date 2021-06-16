import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
  EffectFade,
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, EffectCoverflow, EffectFade, Autoplay, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
readMore:boolean = false
openModalImg:string;
services = []
products = []
gallery = []
testimonials = []
  constructor(
    public _themeService:ThemesManagerService,
  ) { }
  
  ngOnInit(): void {
    // this._themeService.getServices().subscribe(res=>{
    //   this.services = res
    // })
    // this._themeService.getProducts().subscribe(res=>{
    //   this.products = res
    // })
    // this._themeService.getGallery().subscribe(res=>{
    //   this.gallery = res
    // })
    // this._themeService.getTestimonials().subscribe(res=>{
    //   this.testimonials = res
    // })
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  openModal(imgUrl){
    this.openModalImg = imgUrl;
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
