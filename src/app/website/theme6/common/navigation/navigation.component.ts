import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { CartService } from '../../../services/cart.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';
import { CommonService } from '../../../../website/services/common.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @ViewChild('toggler') toggler: ElementRef
  @Input() selectedPage: string = ""
  language = null
  @Input() type: number = 1
  @Input() title: string = ""

  constructor(public _themeService: ThemesManagerService, public cartService: CartService, public customerService: ManageCustomerService, public common: CommonService) { }

  ngOnInit(): void {
    if(this._themeService.isBrowser){
      this.language=localStorage.getItem("language")
    }
    // this.hideSidebar()
  }

  showSidebar() {
    document.getElementById("sidebarMenu").style.display = "block";
    document.getElementById("sidebarMenu").style.transform = "translateX(0px)";  
  }
  
  hideSidebar() {
    document.getElementById("sidebarMenu").style.display = "none";
    document.getElementById("sidebarMenu").style.transform = "translateX(-110%);";  
  }

  toggle() {
    // this.toggler.nativeElement.click()
    this.hideSidebar()
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

  logout() {
    this.customerService.logoutCustomer()
  }

  search(event) {
    let path = "/products"
    if(event.key == "Enter") {
      let keyWords = event.target.value.toLocaleLowerCase( )
      this._themeService.navigateTo(path,{key:keyWords})
    }
  }

  blankSearchField(searchText) {
    searchText.value = null
  }

}
