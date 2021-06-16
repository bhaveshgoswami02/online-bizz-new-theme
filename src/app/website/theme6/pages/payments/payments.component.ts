import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  onlinePay=false;
  bankDetails=false;
  constructor(public _themeService: ThemesManagerService) {

  }

  ngOnInit(): void {}

  bankDetailsShow(){
    this.onlinePay=false;
    this.bankDetails=true;
  }
  onlinePayShow(){
    this.onlinePay=true;
    this.bankDetails=false;
  }

  getCover() {
    if (this._themeService?.data?.themeCover) {
      return "url('" + this._themeService?.data?.themeCover + "')"
    }
    else {
      return "url('https://htmldemo.hasthemes.com/businex/businex/assets/img/page-header.jpg')";
    }
  }
  
}
