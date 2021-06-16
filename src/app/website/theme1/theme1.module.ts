import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Theme1Component } from './theme1.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { VideoComponent } from './pages/video/video.component';
import { SharedModule } from '../shared/shared.module';
import { CustomPageComponent } from './pages/custom-page/custom-page.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { ProductCardComponent } from './common/product-card/product-card.component';
import { ServiceCardComponent } from './common/service-card/service-card.component';
import { TestimonialCardComponent } from './common/testimonial-card/testimonial-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderSuccessfulComponent } from './pages/order-successful/order-successful.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import {Theme1RoutingModule} from './theme1-routing.module'

@NgModule({
  declarations: [
    Theme1Component,
    FooterComponent,
    NavigationComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    GalleryComponent,
    PaymentsComponent,
    ProductsComponent,
    ServicesComponent,
    VideoComponent,
    CustomPageComponent,
    ServiceDetailsComponent,
    ProductCardComponent,
    ServiceCardComponent,
    TestimonialCardComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessfulComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    Theme1RoutingModule
  ],
  exports: [
    Theme1Component
  ]
})
export class Theme1Module { }
