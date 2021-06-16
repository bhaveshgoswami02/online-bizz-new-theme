import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


let routes: Routes = [
  {path:"**", component:AppComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
