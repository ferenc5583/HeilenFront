import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavParams, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TerminosPage } from '../terminos/terminos';
import { DatePipe } from '@angular/common';
import { RutaPage } from '../ruta/ruta';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-precontrato',
    templateUrl: 'precontrato.html'
})

export class PrecontratoPage {

    before: boolean = false;

    idCont: any;
    idPro: any;
    nombrePro: any;
    apellidoPro: any;
    rutPro: any;
    especialidadPro: any;
    currentDate: any;
    currentTime: any;
    caliPro: any;
    monto: any;

    token = localStorage.getItem('token');

    constructor(public http: HttpClient, public navParams: NavParams, private auth: AuthService, public navCtrl: NavController, private datePipe: DatePipe) {

        this.idPro = navParams.get('id');

    }

    ngOnInit() {
        var date = new Date();
        this.currentTime = this.datePipe.transform(date, "shortTime");
        this.http.get(`${this.auth.url}/user/${this.idPro}`)
            .subscribe((res: any) => {
                this.nombrePro = res.firstname.toUpperCase();
                this.apellidoPro = res.lastname.toUpperCase();
                this.rutPro = res.rut.toUpperCase();
                this.especialidadPro = res.id_especialidad.nombre.toUpperCase();
                this.caliPro = res.id_calificacion.pun_final.toFixed(2);
                this.currentDate = this.datePipe.transform(date, "dd-MM-yyyy");
                if (res.id_especialidad.nombre == "Kinesiologo") {
                    this.monto = 15000;
                }
                if (res.id_especialidad.nombre == "Nutricionista") {
                    this.monto = 18000;
                }
                if (res.id_especialidad.nombre == "Enfermero") {
                    this.monto = 18000;
                }
            });
    }

    goToMatrix() {
        //agregar validacion de diponibilidad
        if (this.before == false) {
            this.http.post(`${this.auth.url}/contrato/`, { id_profesional: this.idPro, monto: this.monto, fecha: this.currentDate.toString(), hora: this.currentTime.toString() },
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token } })
                .subscribe((res: any) => {
                    this.idCont = res.id;
                    this.before = true;
                    this.auth.showAlert("Espere hasta que el Profesional acepte su Petición");
                    this.chekAcept();
                });
        }
    }

    chekAcept() {
        setInterval(() => {
            if (this.before == true) {
                this.http.get(`${this.auth.url}/contrato/${this.idCont}`).subscribe((res: any) => {
                    if (res.aceptada == true && this.before == true) {
                        this.before = false;
                        this.navCtrl.setRoot(RutaPage,
                            {
                                id: this.idPro,
                                id_cont: this.idCont
                            });
                    }
                    if(res.cancelada == true && this.before == true){
                        this.before = false;
                        this.navCtrl.setRoot(HomePage);
                        this.auth.showAlert("El profesional ha rechazado la Petición");
                        this.http.delete(`${this.auth.url}`+'/contrato/'+ this.idCont).subscribe((res: any)=>{
                            console.log(res);
                        })
                    }
                })
            }
        }, 3000)
    }

    goToTerminos() {
        this.navCtrl.push(TerminosPage);
    }

}