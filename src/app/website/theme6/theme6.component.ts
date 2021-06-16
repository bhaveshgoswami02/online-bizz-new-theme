import { Component, OnInit, Renderer2, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ThemesManagerService } from '../services/themes-manager.service';
import { CommonService } from '../services/common.service';
declare var WhWidgetSendButton;

@Component({
  selector: 'app-theme6',
  templateUrl: './theme6.component.html',
  styleUrls: ['./theme6.component.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class Theme6Component implements OnInit {
  selectedPage=null;
  
  constructor(public route:ActivatedRoute,public theme:ThemesManagerService, private _renderer2: Renderer2, public common:CommonService,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    this.appendCode()
    this.appendWhatshelp()

    if(this.theme.data?.themeColors && this.theme.isBrowser){
      this.changeTheme(this.theme.data.themeColors.primaryColor,this.theme.data.themeColors.primaryColorContrast,this.theme.data.themeColors.secondaryColor,this.theme.data.themeColors.secondaryColorContrast);
    }
  }

  changeTheme(primary: string,primaryContrast:string,secondary:string,secondaryContrast:string) {
/*     if(primary){
      document.documentElement.style.setProperty('--primary', primary);
    }
    if(primaryContrast){
      document.documentElement.style.setProperty('--primary-contrast', primaryContrast);
    }
    if(secondary){
      document.documentElement.style.setProperty('--secondary', secondary);
    }
    if(secondaryContrast){
      document.documentElement.style.setProperty('--secondary-contrast', secondaryContrast);
    } */
    let css = ':root{'
    if(primary){
      css=css+'--primary:'+primary+';'
      //document.documentElement.style.setProperty('--primary', primary);
    }
    if(primaryContrast){
      css=css+'--primary-contrast:'+primaryContrast+';'
      //document.documentElement.style.setProperty('--primary-contrast', primaryContrast);
    }
    if(secondary){
      css=css+'--secondary:'+secondary+';'
      //document.documentElement.style.setProperty('--secondary', secondary);
    }
    if(secondaryContrast){
      css=css+'--secondary-contrast:'+secondaryContrast+';'
      //document.documentElement.style.setProperty('--secondary-contrast', secondaryContrast);
    }
    css=css+'}';
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

  appendWhatshelp(){


/*         var options = {
            whatsapp: "918955018041", // WhatsApp number
            call: "918955018041", // Call phone number
            call_to_action: "Message us", // Call to action
            button_color: "#FF6550", // Color of button
            position: "right", // Position may be 'right' or 'left'
            order: "whatsapp,call", // Order of buttons
        };
        var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); */
        if(this.theme.data.theme!=6) {
          var options = {
            whatsapp: this.theme?.data?.whatsappNo, // WhatsApp number
            call: this.theme?.data?.phoneNo, // Call phone number 
            call_to_action: "Message us", // Call to action
            button_color: "#FF6550", // Color of button
            position: "right", // Position may be 'right' or 'left'
            order: "whatsapp,call", // Order of buttons
          };
          var proto = document.location.protocol,
            host = "whatshelp.io",
            url = proto + "//static." + host;
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = url + '/widget-send-button/js/init.js';
          s.onload = function() {
            WhWidgetSendButton.init(host, proto, options);
          };
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        }
        


  }

  appendCode(){
    //console.log(document.head.innerHTML)
    let AppendFaviconCode = `
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '${this.theme.data.favicon?this.theme.data.favicon:''}';
    
    `
    // console.log(AppendFaviconCode)
    // console.log(this.theme.data)
    if(true){
      let script = this._renderer2.createElement('script');
      script.innerHTML=AppendFaviconCode+this.theme.data.script
      this._renderer2.appendChild(this._document.body, script);
    }
    if(this.theme.data.noscript){
      let noscript= this._renderer2.createElement("noscript")
      noscript.innerHTML=this.theme.data.noscript
      this._renderer2.appendChild(this._document.body, noscript);
    }

    if(this.theme.data.style){
      let style= this._renderer2.createElement("style")
      style.innerHTML=this.theme.data.style

      this._renderer2.appendChild(this._document.body, style);
    }
  }

}
