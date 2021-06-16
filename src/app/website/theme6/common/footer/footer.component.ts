import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  phoneNumber = ""
  domainUrl = environment.domain
  domainName = environment.domainName
  constructor(public _themeService: ThemesManagerService) { }

  ngOnInit(): void {
  }

  getCover() {
    if (this._themeService ?.data ?.themeCover) {
      return "url('" + this._themeService ?.data ?.themeCover + "')"
    }
    else {
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }

  changeLanguage(langCode: string = "en") {
    var language = langCode;
    var selectField: any = document.querySelector("#google_translate_element select");
    for (var i = 0; i < selectField.children.length; i++) {
      var option: any = selectField.children[i];
      console.log(option)
      // find desired langauge and change the former language of the hidden selection-field 
      if (option.value == language) {
        selectField.selectedIndex = i;
        // trigger change event afterwards to make google-lib translate this side
        selectField.dispatchEvent(new Event('change'));
        break;
      }
    }
  }

  languages = [
    { languageTitle: 'English', languageCode: 'en' },
    { languageTitle: 'हिन्दी', languageCode: 'hi' },
    { languageTitle: 'मराठी', languageCode: 'mr' },
    { languageTitle: 'ગુજરાતી', languageCode: 'gu' },
    { languageTitle: 'தமிழ்', languageCode: 'ta' },
    { languageTitle: 'Swedish', languageCode: 'sv' },
  ]

}
