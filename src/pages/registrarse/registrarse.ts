import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';

@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html'
})
export class RegistrarsePage {

  rut: string = "";
  username: string = "";
  password: string = "";
  firstname: string = "";
  lastname: string = "";
  passRepete: string = "";

  url = 'http://localhost:8081';

  constructor(public navCtrl: NavController, public http: HttpClient) {
  }

  goToRegister(){
    if(this.password != this.passRepete){
      alert("La contraseñas no coinciden");
    }else{
      let url = `${this.url}/user/nuevo/`;
      this.http.post(url, {username: this.username ,password: this.password, rut: this.rut ,firstname: this.firstname, lastname: this.lastname , enabled: true, online: false, lastPasswordResetDate: "2018-09-21"}).subscribe(res => {
        this.http.post(`${this.url}/posicion/`, { lat: 0 , lng: 0 , id_usuario: { id : res.id }}).subscribe(lares => console.log(lares));
      });
      this.navCtrl.setRoot(InicioSesionPage);
    }
  }

  goToTerminos(){
    alert("te vamoa a kagar");
  }
}
