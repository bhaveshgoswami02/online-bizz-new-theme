import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentService } from 'src/app/website/services/shipment.service';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-my-shippments',
  templateUrl: './my-shippments.component.html',
  styleUrls: ['./my-shippments.component.scss']
})
export class MyShippmentsComponent implements OnInit {
  allData:any = []
  skeleton:boolean = true
  constructor(public router:Router,public shipmentService:ShipmentService,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.shipmentService.getData().subscribe(res=>{
      this.allData = res
      if(!this.allData){
        this.allData = []
      }
      this.skeleton = false
      console.log("all shipments",this.allData)
    })
  }

}
