import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services = []
  skeleton:boolean = true
  constructor(
    public _themeService:ThemesManagerService
  ) { }

  ngOnInit(): void {
    this.getServices()
  }
  
  getServices() {
    this._themeService.getDataByCollection("services").subscribe(res=>{
      this.services = res
      this.skeleton = false
    })
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
