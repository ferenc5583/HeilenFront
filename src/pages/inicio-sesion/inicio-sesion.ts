import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegistrarsePage } from '../registrarse/registrarse';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { RestaurarContrasenaPage } from '../restaurar-contrasena/restaurar-contrasena';
import { HttpClient } from '@angular/common/http';
import { RutaPage } from '../ruta/ruta';

@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html'
})

export class InicioSesionPage {

  username: string;
  password: string;
  isLogged: boolean;

  url = 'http://localhost:8081';

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    private auth: AuthService) {
  }

  Signup() {
    //login solo para pacientes, cambiar numero de rol para otros roles
    let f = { username: this.username, password: this.password };
    this.http.get(`${this.url}/user/byRole/${this.username},1`).subscribe(res => {
      this.auth.login(f)
        .subscribe(
          rs => this.isLogged = rs,
          er => console.log(er),
          () => {
            if (this.isLogged == true) {
              this.navCtrl.setRoot(HomePage)
                .then(data => console.log(data),
                  error => console.log(error));
            } else {
              console.log("Acceso Denegado");
            }
          }
        )
    }, error => alert("Credenciales incorrectas o inexistentes"))
  }

  goToRegister(params) {
    if (!params) params = {};
    this.navCtrl.push(RegistrarsePage);
  }

  passForgot() {
    this.navCtrl.push(RestaurarContrasenaPage);
  }

  ngOnInit() {
    this.subscribeCurrentPosition()
  }

  subscribeCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error)
        alert("GPS desactivado, Activelo");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  }

  goToMatrix(){
    this.navCtrl.push(RutaPage);
  }
}
