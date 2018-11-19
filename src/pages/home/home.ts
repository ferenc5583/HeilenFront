import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { PrecontratoPage } from '../precontrato/precontrato';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: any;
  lng: any;
  locations: any;

  token = localStorage.getItem('token');

  protected map: any;

  id_user: any;

  constructor(public navCtrl: NavController, public geo: Geolocation, public http: HttpClient, private auth: AuthService) {

  }

  ngOnInit() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch(err => alert("No hemos podido encontrarte, Procura activar tu GPS" + err));

    this.http.put(`${this.auth.url}/user/isOnline/1`, {}, { headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token } }).subscribe();

    setInterval(() => {
      this.geo.getCurrentPosition().then(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.http.put(`${this.auth.url}/posicion/editUser/${pos.coords.latitude},${pos.coords.longitude}`, {}, { headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token } })
          .subscribe()
      }).catch(err => alert("No hemos podido encontrarte, Procura activar tu GPS" + err));

      let url = `${this.auth.url}/posicionProf/`;

      this.http.get(url, { headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token } })
        .subscribe((r: any) => {
          this.locations = r;
        })
    }, 10000);
  }

  protected mapReady(map) {
    this.map = map;
  }

  public myPosition = () => {
    if (this.map)
      this.map.panTo({ lat: this.lat, lng: this.lng });
  }

  goToResumen(location) {
    this.navCtrl.push(PrecontratoPage,
      {
        id: location.id_usuario.id
      });
  }
}
