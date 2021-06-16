import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
slug
serviceDetails
  constructor(public route:ActivatedRoute,public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get("slug")
    this._themeService.getServiceDetails(this.slug).subscribe(serviceData=>{
      this.serviceDetails = serviceData[0]
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

  getDataFromArray(slug){
    this._themeService.services.forEach(element=>{
      if(element.slug == slug){
        this.serviceDetails = element
        console.log("service details from array",this.serviceDetails)
      }
    })
  }
}
