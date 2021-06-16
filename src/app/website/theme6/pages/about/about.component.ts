import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public _themeService:ThemesManagerService
  ) { }

  ngOnInit(): void { 
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
