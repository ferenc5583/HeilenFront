import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegistrarsePage } from '../registrarse/registrarse';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { RestaurarContrasenaPage } from '../restaurar-contrasena/restaurar-contrasena';

@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html'
})

export class InicioSesionPage {

  username: string;
  password: string;
  isLogged: boolean;

  constructor(
    public navCtrl: NavController,
    private auth: AuthService) {
  }
  
  Signup(){
    let f = {username: this.username, password: this.password};
    this.auth.login(f)
    .subscribe(
      rs => this.isLogged = rs,
      er => console.log(er),
      () => {
        if(this.isLogged){
          this.navCtrl.setRoot(HomePage)
          .then(data => console.log(data),
          error => console.log(error));
        }else{
          console.log("Acceso Denegado");
        }
      }
    )
  }

  goToRegister(params){
    if (!params) params = {};
    this.navCtrl.push(RegistrarsePage);
  }

  passForgot(){
    this.navCtrl.push(RestaurarContrasenaPage);
  }
}
