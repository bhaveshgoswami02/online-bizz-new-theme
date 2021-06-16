import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id = null
  singleOrder
  params
  constructor(public route:ActivatedRoute,public _themeService:ThemesManagerService,public common:CommonService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.params = params
      this.id = this.params.id
      // console.log("order id",this.params)
      this.getSingleOrder()
    })
  }

  getSingleOrder() {
    this._themeService.getSingleOrder(this.id).subscribe(res=>{
      this.singleOrder = res
      console.log("single order",this.singleOrder)
    })
  }

}
