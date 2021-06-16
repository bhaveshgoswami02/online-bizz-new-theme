import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import Swiper, { HashNavigation, Navigation } from 'swiper';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GoogleMapsModule,
    RouterModule,
    SwiperModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    RouterModule,
    SwiperModule
  ]
})
export class SharedModule { }
