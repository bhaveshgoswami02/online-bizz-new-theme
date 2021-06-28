import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./pages/cart/cart.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { CustomPageComponent } from "./pages/custom-page/custom-page.component";
import { OrderSuccessfulComponent } from "./pages/order-successful/order-successful.component";
import { PaymentsComponent } from "./pages/payments/payments.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ServiceDetailsComponent } from "./pages/service-details/service-details.component";
import { ServicesComponent } from "./pages/services/services.component";
import { AboutComponent } from "./pages/about/about.component";
import { GalleryComponent } from "./pages/gallery/gallery.component";
import { HomeComponent } from "./pages/home/home.component";
import { Theme6Component } from "./theme6.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { RegisterComponent } from "./pages/register/register.component";
import { MyShippmentsComponent } from "./pages/my-shippments/my-shippments.component";
import { MyOrdersComponent } from "./pages/my-orders/my-orders.component";
import { OrderDetailComponent } from "./pages/order-detail/order-detail.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { EditProfileComponent } from "./pages/edit-profile/edit-profile.component";
import { AllAddressComponent } from "./pages/all-address/all-address.component";
import { SingleAddressComponent } from "./pages/single-address/single-address.component";
import { SuperCategoriesComponent } from "./pages/super-categories/super-categories.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { SubCategoriesComponent } from "./pages/sub-categories/sub-categories.component";
import { BrandsComponent } from "./pages/brands/brands.component";
import { SearchComponent } from "./pages/search/search.component";
import { AuthGuardService } from "./common/services/auth-guard.service";
import { ProductCardComponent } from "../theme1/common/product-card/product-card.component";

const routes:Routes=[
    {path:"",component:Theme6Component,children:[
        {path:"",component:HomeComponent},
        {path:'home',component:HomeComponent},
        {path:'about',component:AboutComponent},
        {path:'services',component:ServicesComponent},
        {path:'services/:slug',component:ServiceDetailsComponent},
        {path:'gallery',component:GalleryComponent},
        {path:'payments',component:PaymentsComponent},
        {path:'products',component:ProductsComponent},
        {path:'product',component:ProductDetailsComponent},
        {path:'contact',component:ContactComponent},
        {path:'cart',component:CartComponent},
        {path:'checkout',component:CheckoutComponent},
        {path:'order-successful',component:OrderSuccessfulComponent},
        {path:'page/:page',component:CustomPageComponent},
        {path:"signin",component:SigninComponent},
        {path:'register',component:RegisterComponent},
        {path:'my-shippments',component:MyShippmentsComponent,canActivate:[AuthGuardService]},
        {path:'orders',component:MyOrdersComponent,canActivate:[AuthGuardService]},
        {path:'order',component:OrderDetailComponent,canActivate:[AuthGuardService]},
        {path:'profile',component:ProfileComponent},
        {path:'edit-profile',component:EditProfileComponent,canActivate:[AuthGuardService]},
        {path:"all-address",component:AllAddressComponent,canActivate:[AuthGuardService]},
        {path:"single-address",component:SingleAddressComponent},
        {path:'super-categories',component:SuperCategoriesComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'subCategories',component:SubCategoriesComponent},
        {path:'brand',component:BrandsComponent},
        {path:'search',component:SearchComponent},
        {path:'**',component:CustomPageComponent}

    ]}
  ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class Theme6RoutingModule {}