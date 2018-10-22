import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: HttpClient, private auth: AuthService) {
  }

  goToRegister(){
    var separador;
    var arregloDeSubCadenas;
    this.http.get(`https://api.rutify.cl/rut/${this.rut}`).subscribe((res: any) => {
      var cadena = (res.nombre);
      separador = " ", // un espacio en blanco
      arregloDeSubCadenas = cadena.split(separador);
      if(this.firstname.toLocaleLowerCase() == arregloDeSubCadenas[2] && this.lastname.toLocaleLowerCase() == arregloDeSubCadenas[0]){
        if(this.password != this.passRepete){
          alert("La contraseñas no coinciden");
        }else{
          let url = `${this.auth.url}/user/nuevoPaciente/`;
          //cambiar fecha x fecha actual del sistema
          this.http.post(url, {username: this.username ,password: this.password, rut: this.rut ,firstname: this.firstname, lastname: this.lastname , enabled: true, online: false, lastPasswordResetDate: "2018-09-21"}).subscribe((res: any) => {
            this.http.post(`${this.auth.url}/posicion/`, { lat: 0 , lng: 0 , id_usuario: { id : res.id }}).subscribe(lares => console.log(lares));
          });
          this.navCtrl.setRoot(InicioSesionPage);
        }
      }else{
        alert("tus credenciales no coinciden");
      }
    }, error => {
      alert("rut invalido");
    })
  }

  //hacer planilla de terminos y condiciones funcional
  goToTerminos(){
    alert("te vamoa a kagar");
  }

  abreModal(){
    const alert = this.alertCtrl.create({
      title: 'Ayuda',
      subTitle: 'Procura ingresar tus datos veridicos tanto rut, nombre, apellido y tu correo',
      buttons: ['Cerrar']
    });
    alert.present();
  }
}
