import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {
  pageTitle
  content=""
  constructor(public _theme:ThemesManagerService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.pageTitle = this.route.snapshot.params
    console.log("pageTitle",this.pageTitle)
    this.getData()
  }

  getData() {
    this._theme.getSingleCustomPage(this.pageTitle.page).subscribe((res:any)=>{
      console.log(res)
      this.content=res[0]?.content
    })
  }

}
