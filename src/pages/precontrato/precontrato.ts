import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavParams, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { RutaPage } from '../ruta/ruta';

@Component({
    selector: 'page-precontrato',
    templateUrl: 'precontrato.html'
})

export class PrecontratoPage{

    idPro: any;
    nombrePro: any;
    apellidoPro: any;
    rutPro: any;
    especialidadPro: any;

    constructor(public http: HttpClient, public navParams: NavParams, private auth: AuthService, public navCtrl: NavController) {

        this.idPro = navParams.get('id');

    }

    ngOnInit(){
        this.http.get(`${this.auth.url}/user/${this.idPro}`)
      .subscribe((res: any) => {
        console.log(res);
      });
    }

    goToMatrix() {
        this.navCtrl.setRoot(RutaPage,
          {
            id: this.idPro
          });
      }

}