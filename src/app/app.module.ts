import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Post } from './services/post';
import { LoadComponent } from './components/load/load.component';
import { ToastComponent } from './components/toast/toast.component';

import { CallNumber } from '@ionic-native/call-number/ngx'; //não está em uso ios
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx'; //retirar
import { Device } from '@ionic-native/device/ngx'; 
import { AlertComponent } from './components/alert/alert.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    StatusBar,
    SplashScreen,
    Post,
    LoadComponent,
    ToastComponent,
    SocialSharing,
    CallNumber,
    PhotoViewer,
    Device,
    AlertComponent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
