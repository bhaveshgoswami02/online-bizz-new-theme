import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Theme6Component } from '../theme6/theme6.component';
import { ServiceCardComponent } from './common/service-card/service-card.component';
import { TestimonialCardComponent } from './common/testimonial-card/testimonial-card.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from '../theme6/common/footer/footer.component';
import { NavigationComponent } from '../theme6/common/navigation/navigation.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderSuccessfulComponent } from './pages/order-successful/order-successful.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { ServicesComponent } from './pages/services/services.component';
import { VideoComponent } from './pages/video/video.component';
import { ProductCardComponent } from './common/product-card/product-card.component';
import { CustomPageComponent } from './pages/custom-page/custom-page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyShippmentsComponent } from './pages/my-shippments/my-shippments.component';
import { TabComponent } from './common/tab/tab.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingleAddressComponent } from './pages/single-address/single-address.component';
import { AllAddressComponent } from './pages/all-address/all-address.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { SuperCategoriesComponent } from './pages/super-categories/super-categories.component';
import { SearchComponent } from './pages/search/search.component';
import {Theme6RoutingModule} from './theme6-routing.module'
import { LoaderComponent } from './common/loader/loader.component';
import { SkeletonComponent } from './common/skeleton/skeleton.component';
import { EmptyViewComponent } from './common/empty-view/empty-view.component';


@NgModule({
  declarations: [
    Theme6Component,
    ServiceCardComponent,
    TestimonialCardComponent,
    AboutComponent,
    FooterComponent,
    NavigationComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    GalleryComponent,
    HomeComponent,
    OrderSuccessfulComponent,
    PaymentsComponent,
    ProductDetailsComponent,
    ProductsComponent,
    ServiceDetailsComponent,
    ServicesComponent,
    VideoComponent,
    ProductCardComponent,
    CustomPageComponent,
    SigninComponent,
    RegisterComponent,
    MyShippmentsComponent,
    TabComponent,
    ProfileComponent,
    SingleAddressComponent,
    AllAddressComponent,
    EditProfileComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    NavigationComponent,
    BrandsComponent,
    SuperCategoriesComponent,
    SearchComponent,
    LoaderComponent,
    SkeletonComponent,
    EmptyViewComponent

  ],
  imports: [
    CommonModule,
    Theme6RoutingModule,
    SharedModule,
  ],
  exports: [
    Theme6Component
  ]
})
export class Theme6Module { }
