import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-mi-cuenta',
  templateUrl: 'mi-cuenta.html'
})
export class MiCuentaPage {

  private options;

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
  
  logOut(){
    this.auth.logout();
    this.navCtrl.setRoot(InicioSesionPage);
  }

  Test(): Observable<any>{
    console.log(this.options);
    //this.http.get('http://localhost:8081/user/').subscribe(res => console.log(res));
    let url = "http://localhost:8081/user/";
    this.http.get(url, this.options)
    .subscribe(r => console.log(r));
    return;
 }

}
