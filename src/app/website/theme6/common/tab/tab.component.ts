import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/website/services/cart.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
active:string = "home"
whatsapp:string=null
  constructor(public _themeService: ThemesManagerService,public cartService:CartService) { }

  ngOnInit(): void {
    this.whatsapp='https://api.whatsapp.com/send?phone=' + this._themeService.data.whatsappNo +'&text=Hi,I have visited your website and want to enquire about your services'
  }


}
