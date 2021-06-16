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
import { Theme1Component } from "./theme1.component";


const routes:Routes=[
    {path:"",component:Theme1Component,children:[
        {path:'',component:HomeComponent},
        {path:'home',component:HomeComponent},
        {path:'about',component:AboutComponent},
        {path:'services',component:ServicesComponent},
        {path:'services/:slug',component:ServiceDetailsComponent},
        {path:'gallery',component:GalleryComponent},
        {path:'payments',component:PaymentsComponent},
        {path:'products',component:ProductsComponent},
        {path:'products/:id',component:ProductDetailsComponent},
        {path:'contact',component:ContactComponent},
        {path:'cart',component:CartComponent},
        {path:'checkout',component:CheckoutComponent},
        {path:'order-successful',component:OrderSuccessfulComponent},
        {path:'pages/:page',component:CustomPageComponent},
        {path:'**',component:CustomPageComponent}

    ]}
  ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class Theme1RoutingModule {}