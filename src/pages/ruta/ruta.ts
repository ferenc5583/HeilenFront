import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html'
})
export class RutaPage {

    public lat: any;
    public lng: any;

    public origin: any;
    public destination: any;

  constructor(public navCtrl: NavController, public geo: Geolocation) {
   
  }

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch(err => alert("No hemos podido encontrarte, Procura activar tu GPS"));
  }

  ngOnInit() {
    this.getDirection()
  }
   
  getDirection() {
    this.origin = { lat: -36.627417, lng: -71.829806 }
    this.destination = { lat:  -36.609301, lng: -72.101100 } 
  }

}