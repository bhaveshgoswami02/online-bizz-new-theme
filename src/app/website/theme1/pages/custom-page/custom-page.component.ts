import { Component, Input, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {
  @Input("selectedPage") pageTitle
  content=""
  constructor(public _themeService:ThemesManagerService) { }

  ngOnInit(): void {
    this._themeService.getSingleCustomPage(this.pageTitle).subscribe((res:any)=>{
      console.log(res)
      this.content=res.content
    })
  }

}
