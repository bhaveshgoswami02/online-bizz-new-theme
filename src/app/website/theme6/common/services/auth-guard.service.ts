import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ManageCustomerService } from 'src/app/website/services/manage-customer.service';
import { ThemesManagerService } from 'src/app/website/services/themes-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth:ManageCustomerService,public _themeService:ThemesManagerService) { }

  canActivate(): boolean {
    if(this.auth.isCustomerLoggedIn()){
      return true
    }
    else
    {
      this._themeService.navigateTo('/signin')
      return false
    }
  }

  
}
