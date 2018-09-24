import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-cambiar',
  templateUrl: 'cambiar.html'
})
export class CambiarPage {

  currentPass: string;
  newPass: string;
  repetePass: string;

  url = 'http://localhost:8081';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: HttpClient) {
  }
  
  abreModal(){
    const alert = this.alertCtrl.create({
      title: 'Ayuda',
      subTitle: 'Si estas restaurando tu contraseña, ingresa en el primer campo la contraseña actual que se te ha enviado a tu Correo',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  //buscar por token el username en el back
  cambiarPass(){
    console.log(this.currentPass);
    console.log(this.newPass);
    console.log(this.repetePass);
    this.http.get(`${this.url}/user/passFind/carmen.amestica.mh@gmail.com,${this.currentPass}`).subscribe(res => {
      if(res.find == true){
        if(this.newPass == this.repetePass){
          this.http.put(`${this.url}/user/passEdit/carmen.amestica.mh@gmail.com,${this.newPass}`, { }).subscribe(lares => {
            alert(lares.message);
            this.currentPass = "";
            this.newPass = "";
            this.repetePass = "";
          });
        }else{
          alert("Las contraseñas no coinciden");
        }
      }
    }, error => alert("Contraseña actual incorrecta"))
    
  }
  
}
