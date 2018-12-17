import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../../services/auth.service';

import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { CierrePage } from '../cierre/cierre';

@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html'
})
export class RutaPage {

  public lat: any;
  public lng: any;

  public origin: any;
  public destination: any;

  distance: any;
  duration: any;

  idPro: any;

  no_rep: boolean = false;

  id_cont: any;

  public markerOptions = {
    origin: {
      icon: '/assets/imgs/ico.origin.png',
    },
    destination: {
      icon: '/assets/imgs/ico.destination.png',
    },
  }

  public renderOptions = {
    suppressMarkers: true,
  }

  constructor(public navCtrl: NavController, public geo: Geolocation, public http: HttpClient, public navParams: NavParams, private auth: AuthService) {

    this.idPro = navParams.get('id');

    this.id_cont = navParams.get('id_cont');
  }

  /* ionViewDidLoad() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch(err => this.auth.showAlert("No podemos Encontrarte"));
  } */

  ngOnInit() {
    this.markerOptions;
    this.renderOptions;
    setInterval(() => {
      if (this.no_rep == false) {
        this.geo.getCurrentPosition().then(pos => {
          this.http.get(`${this.auth.url}/posicionUserId/${this.idPro}`).subscribe((res: any) => {
            let url = `http://router.project-osrm.org/route/v1/car/${pos.coords.longitude},${pos.coords.latitude};${res.lng},${res.lat}`;
            this.origin = { lat: res.lat, lng: res.lng };
            this.destination = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            this.http.get(url)
              .subscribe((r: any) => {
                this.duration = (Math.round(r.routes[0].legs[0].duration) / 60).toFixed(1);
                this.distance = (Math.round(r.routes[0].legs[0].distance) / 1000).toFixed(1);
              })
          })
        }).catch(err => this.auth.showAlert("No podemos Encontrarte"));

        if (this.distance == 0 && this.duration == 0) {
          this.navCtrl.setRoot(CierrePage, {
            id_cont: this.id_cont
          });
          this.no_rep = true;
        }

        this.http.get(`${this.auth.url}/contrato/${this.id_cont}`).subscribe((r :any)=>{
          if(r.cancelada == true){
            this.navCtrl.setRoot(HomePage);
            this.auth.showAlert("El profesional a Cancelado la Solicitud");
            this.no_rep = true;
          }
        })
      }

    }, 2000)
  }

  goToMap() {
    this.navCtrl.setRoot(HomePage);
  }

}