import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment'
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemesManagerService } from '../website/services/themes-manager.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  currentSection = 'features'
  domainName = environment.domainName
  constructor(private _renderer2: Renderer2,public _themeService:ThemesManagerService,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    let script = this._renderer2.createElement('script');
    script.innerHTML =
      `
       var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
       (function(){
       var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
       s1.async=true;
       s1.src='https://embed.tawk.to/5fc7835ba1d54c18d8ef9a1d/default';
       s1.charset='UTF-8';
       s1.setAttribute('crossorigin','*');
       s0.parentNode.insertBefore(s1,s0);
       })();
    `
    this._renderer2.appendChild(this._document.body, script);
    let style1 = this._renderer2.createElement("link")
    style1.href="assets/landing/assets/css/style.css"
    style1.rel="stylesheet"
    this._renderer2.appendChild(this._document.body,style1)
    let style2 = this._renderer2.createElement("link")
    style2.href="assets/landing/assets/css/responsive.css"
    style2.rel="stylesheet"
    console.log(style1)
    this._renderer2.appendChild(this._document.body,style2)
  }



  onSectionChange(sectionId: string) {
    console.log("section id",sectionId)
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    console.log(section)
    // document.querySelector('#' + section)
    // .scrollIntoView();
    this.currentSection = section
  }
}
