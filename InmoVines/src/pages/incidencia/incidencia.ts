import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the IncidenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-incidencia',
  templateUrl: 'incidencia.html',
})
export class IncidenciaPage {

  grabando:boolean = false;
  rutaArchivo:string;
  nombreArchivo:string;
  audio : MediaObject;
  audioList: any[] = [];
  private fileURL: string;
  private audioRetrieved: boolean = false;
  imagen:string = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private media: Media,
              private file: File,
              public platform: Platform,
              public toast: ToastController,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidenciaPage');
  }

  grabar(){
    if (this.platform.is('ios')) {
      this.nombreArchivo = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.rutaArchivo = this.file.documentsDirectory + this.nombreArchivo;
      this.audio = this.media.create(this.rutaArchivo);
    } else if (this.platform.is('android') || this.platform.is('core')) {
      this.nombreArchivo = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.rutaArchivo = this.file.externalDataDirectory + this.nombreArchivo;
      this.audio = this.media.create(this.rutaArchivo);
    }
    this.audio.startRecord();
    if (!this.platform.is('core')) {
      this.file.resolveLocalFilesystemUrl(this.rutaArchivo).then((onfullfilled) => {
        this.fileURL = onfullfilled.toURL();
      });
    }
    this.grabando = true;

}


  stop() {
  console.log('Fin');
  this.audioRetrieved = true;
  this.audio.stopRecord();
  this.grabando = false;
}

playAudio() {
  this.audio.seekTo(0);
  this.audio.play();
  this.grabando = true;
  this.audio.setVolume(0.8);
}
stopAudio() {
  this.audio.stop();
  this.grabando = false;
}

sendAudio(){
  let toast = this.toast.create({
    message: 'Audio enviado correctamente',
    duration: 3000,
    position: 'top'
  });
  toast.present();
}


getImagen(){
  let options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 1000,
    targetHeight: 1000,
    quality: 100
}
this.camera.getPicture( options )
.then(imageData => {
  this.imagen = `data:image/jpeg;base64,${imageData}`;
})
.catch(error =>{
  console.error( error );
});




}}

