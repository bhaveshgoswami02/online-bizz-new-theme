import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../services/themes-manager.service';

@Component({
  selector: 'app-validity-expired',
  templateUrl: './validity-expired.component.html',
  styleUrls: ['./validity-expired.component.scss']
})
export class ValidityExpiredComponent implements OnInit {

  constructor(
    public _themeService: ThemesManagerService
  ) { }

  ngOnInit(): void {}

}
