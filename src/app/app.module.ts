import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RutaPage } from '../pages/ruta/ruta';
import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';
import { RegistrarsePage } from '../pages/registrarse/registrarse';
import { MiCuentaPage } from '../pages/mi-cuenta/mi-cuenta';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RutaPage,
    InicioSesionPage,
    RegistrarsePage,
    MiCuentaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxzUOUr8XRiAPvL5sdhs7gYhC8_GxWrEU'
    }),
    AgmDirectionModule,
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RutaPage,
    InicioSesionPage,
    RegistrarsePage,
    MiCuentaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
