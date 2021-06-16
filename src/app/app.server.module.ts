import { NgModule } from '@angular/core';


import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
