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
  skeleton:boolean = true
  constructor(
    public _themeService:ThemesManagerService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._themeService.getDataByCollection("gallery").subscribe(res=>{
      this.gallery = res
      this.skeleton = false
      // console.log("gallery",this.gallery)
    })
  }

  openModal(imgUrl){
    this.openModalImg = imgUrl;
  }

  getCover(){
    if(this._themeService?.data?.themeCover){
      return "url('"+this._themeService?.data?.themeCover+"')"
    }
    else{
      return "url('https://htmldemo.hasthemes.com/businex/businex/assets/img/page-header.jpg')";
    }
  }
 
}
