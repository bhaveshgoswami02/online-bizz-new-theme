import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  @Input() service: any

  constructor(public _themeService: ThemesManagerService,public router:Router) { }

  ngOnInit(): void {
  }

  moreDetail() {
    if(this.service.slug) {
      this.router.navigateByUrl(this._themeService.customDomain? '/services/'+this.service.slug : '/'+this._themeService.domainName+'/services/'+this.service.slug)
    }
  }


}
