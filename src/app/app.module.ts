import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';
import { WebsiteLoaderComponent } from './website/website-loader/website-loader.component';
import { ValidityExpiredComponent } from './website/validity-expired/validity-expired.component';

const appConfig=(config:ConfigService)=>{
  return () =>{
    return config.loadConfig()
  }
}


@NgModule({
  declarations: [
    AppComponent,
    WebsiteLoaderComponent,
    ValidityExpiredComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    BrowserAnimationsModule,
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [
    ConfigService,
    {
      provide:APP_INITIALIZER,
      useFactory:appConfig,
      multi:true,
      deps:[ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }