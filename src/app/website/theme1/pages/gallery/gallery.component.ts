import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  openModalImg:string;
  gallery = []
  constructor(
    public _themeService:ThemesManagerService
  ) { }

  ngOnInit(): void {
    // this._themeService.getGallery().subscribe(res=>{
    //   this.gallery = res
    // })
  }

  openModal(imgUrl){
    this.openModalImg = imgUrl;
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
