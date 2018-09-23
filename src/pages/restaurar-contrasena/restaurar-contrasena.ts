import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-restaurar-contrasena',
  templateUrl: 'restaurar-contrasena.html'
})
export class RestaurarContrasenaPage {

  correo: string = "";

  url = 'http://localhost:8081';

  constructor(public navCtrl: NavController, public http: HttpClient) {
    
  }

  forgotPass(){
    let url = `${this.url}/send`;
      this.http.put(`${this.url}/user/${this.correo}`, {}).subscribe(res =>{        
      if(res.find == true){
      this.http.post(url, {to_address: this.correo, subject: "Restaurar Contraseña", body: "Su nueva contraseña es "+res.n_pass+", PROCURE CAMBIARLA UNA VEZ DENTRO DEL SISTEMA"}).subscribe(res => {
          this.correo = "";
        });
      }else{
        alert("Usuario no Encontrado");
      }
      });     
       
  }
  
}
