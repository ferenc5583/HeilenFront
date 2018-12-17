import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { TerminosPage } from '../terminos/terminos';

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
  currentDate: string = "";
  nacimiento: string = "";
  public acept: boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: HttpClient, private auth: AuthService, private datePipe: DatePipe) {
  }

  goToRegister() {
    var date = new Date();
    this.currentDate = this.datePipe.transform(date, "yyyy-MM-dd");
    if (this.password != this.passRepete) {
      this.auth.showAlert("Las contraseñas no Coinciden");
    } else {
      if (this.acept == true) {
        this.http.get(`${this.auth.url}/tools/valiRut/${this.rut}`).subscribe((re: any)=>{
          if(re.rut_valido == true){
            this.http.get(`${this.auth.url}/tools/valiData/${this.nacimiento}`).subscribe((r: any) => {
              if (r.mayor == true) {
                this.http.post(`${this.auth.url}/user/nuevoPaciente/`, { username: this.username, password: this.password, rut: this.rut, firstname: this.firstname, lastname: this.lastname, enabled: true, online: false, lastPasswordResetDate: this.currentDate }).subscribe((res: any) => {
                  if (res.exist != true) {
                    this.http.post(`${this.auth.url}/send`, { to_address: this.username, subject: `Bienvenido(a) a Heilen ${this.firstname.toLocaleUpperCase()}`, body: "Hola! Te damos la mas corial bienvenida a Heilen. Queremos aprovechar esta oportunidad para decirle que estamos contentos de que haya escogido nuestros servicios. Es nuestro privilegio servirle y ofrecerle nuestra mejor atención posible." }).subscribe(res => { });
                    this.auth.showAlert("Usuario guardado exitosamente");
                    this.navCtrl.setRoot(InicioSesionPage);
                  } else {
                    this.auth.showAlert("Este usuario ya está Registrado");
                  }
                });
              }else{
                this.auth.showAlert("No eres mayor de Edad");
              }
            })
          }else{
            this.auth.showAlert("Rut Inválido");
          }
        })
      } else {
        this.auth.showAlert("Deve aceptar Términos y Condiciones");
      }
    }
  }

  goToTerminos() {
    this.navCtrl.push(TerminosPage);
  }

  abreModal() {
    const alert = this.alertCtrl.create({
      title: 'Ayuda',
      subTitle: 'Procura ingresar tus datos verídicos tanto rut, nombre, apellido y tu correo, estos datos son importantes si deseas restaurar tu contraseña',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  /* var date = new Date();
    this.currentDate = this.datePipe.transform(date,"yyyy-MM-dd");
    var separador;
    var arregloDeSubCadenas;
    this.http.get(`https://api.rutify.cl/rut/${this.rut}`).subscribe((res: any) => {
      var cadena = (res.nombre);
      separador = " ", // un espacio en blanco
      arregloDeSubCadenas = cadena.split(separador);
      if(this.firstname.toLocaleLowerCase() == arregloDeSubCadenas[2] && this.lastname.toLocaleLowerCase() == arregloDeSubCadenas[0]){
        if(this.password != this.passRepete){
          this.auth.showAlert("Las contraseñas no Coinciden");
        }else{
          if(this.acept == true){
          let url = `${this.auth.url}/user/nuevoPaciente/`;
          this.http.post(url, {username: this.username ,password: this.password, rut: this.rut ,firstname: this.firstname, lastname: this.lastname , enabled: true, online: false, lastPasswordResetDate: this.currentDate}).subscribe((res: any) => {
            if(res.exist != true){
              this.http.post(`${this.auth.url}/send`, {to_address: this.username, subject: `Bienvenido(a) a Heilen ${this.firstname.toLocaleUpperCase()}`, body: "Hola! Te damos la mas corial bienvenida a Heilen. Queremos aprovechar esta oportunidad para decirle que estamos contentos de que haya escogido nuestros servicios. Es nuestro privilegio servirle y ofrecerle nuestra mejor atención posible."}).subscribe(res => {});
              this.auth.showAlert("Usuario guardado exitosamente");
              this.navCtrl.setRoot(InicioSesionPage);
            }else{
              this.auth.showAlert("Este usuario ya está Registrado");
            }           
          });
        }else{
          this.auth.showAlert("Deve aceptar Términos y Condiciones");
        }
        }
      }else{
        this.auth.showAlert("Tus credenciales no coinciden");
      }
    }, error => {
      this.auth.showAlert("Rut Inválido");
    }) */
}
