import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ViewController } from 'ionic-angular';

// Componentes
import { MyApp } from './app.component';

//Paginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IncidenciaPage } from '../pages/incidencia/incidencia';

//Servicios
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Plugins
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    IncidenciaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    IncidenciaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Media,
    File,
    Camera
  ]
})
export class AppModule {}
