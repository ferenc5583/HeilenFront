import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-restaurar-contrasena',
  templateUrl: 'restaurar-contrasena.html'
})
export class RestaurarContrasenaPage {

  correo: string = "";

  constructor(public navCtrl: NavController, public http: HttpClient, private auth: AuthService) {
    
  }

  forgotPass(){
      let url = `${this.auth.url}/send`;
      this.http.put(`${this.auth.url}/user/${this.correo}`, {}).subscribe((res: any) =>{        
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
