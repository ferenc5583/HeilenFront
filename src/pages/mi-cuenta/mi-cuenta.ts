import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';
import { CambiarPage } from '../cambiar/cambiar';


@Component({
  selector: 'page-mi-cuenta',
  templateUrl: 'mi-cuenta.html'
})
export class MiCuentaPage {

  private options;

  nombre: string;
  apellido: string;
  email: string;
  rut: string;

  url = 'http://localhost:8081';

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    public http: HttpClient) {
    let token = localStorage.getItem('token');
    let myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token
    });
    this.options = new RequestOptions({ headers: myHeaders });
  }

  logOut() {
    this.auth.logout();
    this.navCtrl.setRoot(InicioSesionPage);
  }

  Testla() {
    //esta funcion deve cargar el token
    console.log(this.options);
    let url = `${this.url}/user/`;
    this.http.get(url, this.options)
      .subscribe(r => console.log(r));
  }

  ngOnInit() {
    //funcion de prueba cambiar despues por token
    this.http.get(`${this.url}/user/26`).subscribe(res => {
      this.email = res.username;
      this.nombre = res.firstname.toUpperCase();
      this.apellido = res.lastname.toUpperCase();
      this.rut = res.rut.toUpperCase();
    });
  }

  passChange(){
    this.navCtrl.push(CambiarPage);
  }

}
