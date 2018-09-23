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

  url = 'http://localhost:8081';

  protected map: any;

  constructor(public navCtrl: NavController, public geo: Geolocation, public http: HttpClient) {

    setInterval(()=> {
      this.ionViewDidLoad();
      this.ngOnInit();
    },3000); 

  }

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      console.log(this.lat+" "+this.lng);
    }).catch(err => alert("No hemos podido encontrarte, Procura activar tu GPS"+err));
  }

  ngOnInit(){
    let url = `${this.url}/posicion/`;
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
