import { NgModule } from "@angular/core";
import { LandingComponent } from '../landing/landing.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-rounting.module';


@NgModule({
    declarations: [
        LandingComponent,
    ],
    imports: [
        LandingRoutingModule,
        CommonModule,
        FormsModule,

    ],
   
})
export class LandingModule {}