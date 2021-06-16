import { Component, Input, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  @Input() service: any
  
  constructor(public _themeService: ThemesManagerService) { }

  ngOnInit(): void {
  }

}
