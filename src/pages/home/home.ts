import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lat: any;
  lng: any;
  locations: any;

  token = localStorage.getItem('token');

  url = 'http://localhost:8081';

  protected map: any;

  constructor(public navCtrl: NavController, public geo: Geolocation, public http: HttpClient) {

    setInterval(()=> {
      this.ngOnInit();
    },5000); 

  }

  ngOnInit(){
    let url = `${this.url}/posicionProf/`;

    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.http.put(`${this.url}/posicion/editUser/${pos.coords.latitude},${pos.coords.longitude}`, {}, { headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token } })
      .subscribe()
    }).catch(err => alert("No hemos podido encontrarte, Procura activar tu GPS"+err));

    this.http.get(url)
    .subscribe(r => {
      this.locations = r;
    })
  }

  protected mapReady(map) {
    this.map = map;
  }

  public myPosition = () => {
    if (this.map)
      this.map.panTo({ lat: this.lat, lng: this.lng });
  }

}
