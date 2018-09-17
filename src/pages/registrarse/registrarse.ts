import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';

@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html'
})
export class RegistrarsePage {

  username: string = "";
  password: string = "";
  firstname: string = "";
  lastname: string = "";
  passRepete: string = "";

  constructor(public navCtrl: NavController, public http: HttpClient) {
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }

  goToRegister(){
    if(this.password != this.passRepete){
      console.log("La contraseñas no coinciden");
    }else{
      //console.log("email="+this.username+" "+"contraseña="+this.password+" "+"nombre="+this.firstname+" "+"apellido="+this.lastname);
      let url = "http://localhost:8081/user/nuevo/";
      this.http.post(url, {username: this.username ,password: this.password, firstname: this.firstname, lastname: this.lastname , authorities: [ { id: 1} ], enabled: true, lastPasswordResetDate: "2018-09-16"}).subscribe(res => console.log(res));
      this.navCtrl.setRoot(InicioSesionPage);
    }
  }
}
