import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';
import { ManageCustomerService } from '../../../services/manage-customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  constructor(public _themeService:ThemesManagerService,public customerService:ManageCustomerService) { }

  ngOnInit(): void {
  }

  logout() {
    this.customerService.logoutCustomer()
  }

}
