import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './services/config.service';
import { ThemesManagerService } from './website/services/themes-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Website';

  constructor(public router:Router,public config:ConfigService,public theme:ThemesManagerService){
    
  }

  ngOnInit(){
    console.log(this.theme.data)
    if(this.theme.data){
     
      if(this.config.getRoutes(this.theme.data.theme).length>0 && this.theme.isBrowser){
        this.router.resetConfig(this.config.getRoutes(this.theme.data.theme))
      }
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    
  }
}
