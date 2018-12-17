import { Component } from '@angular/core';
import { NavParams, AlertController, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { TerminosPage } from '../terminos/terminos';

@Component({
    selector: 'page-cierre',
    templateUrl: 'cierre.html'
})

export class CierrePage {

    id_cont: any;

    id_cali: any;

    monto: any;

    before: boolean = false;

    constructor(public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public navCtrl: NavController, public auth: AuthService) {

        this.id_cont = navParams.get('id_cont');

    }

    ngOnInit(){
        this.http.get(`${this.auth.url}/contrato/${this.id_cont}`).subscribe((res: any) => {
            this.monto = res.monto;
            this.http.get(`${this.auth.url}/user/${res.id_profesional}`).subscribe((res: any) => {
                this.id_cali = res.id_calificacion.id;
            })
        })
    }

    pay() {
        this.http.put(`${this.auth.url}/contrato/estados/1,1,0,0,${this.id_cont}`, {}).subscribe((r: any) => {
            this.navCtrl.setRoot(HomePage);
        })
    }

    testRadioOpen = false;
    testRadioResult: any;

    calificate() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Calificaciones');

        alert.addInput({
            type: 'radio',
            label: '1. Mal',
            value: '1',
        });

        alert.addInput({
            type: 'radio',
            label: '2. Regular',
            value: '2'
        });

        alert.addInput({
            type: 'radio',
            label: '3. Bien',
            value: '3',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: '4. Muy Bien',
            value: '4'
        });

        alert.addInput({
            type: 'radio',
            label: '5. Exelente',
            value: '5'
        });

        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Calificar',
            handler: (data: any) => {
                //console.log('Ud Calificó con:', data);
                this.testRadioOpen = false;
                this.testRadioResult = data;
                this.http.put(`${this.auth.url}/calificacion/user/${this.id_cali},${data}`, {}).subscribe((res: any) =>{
                    this.before = true;
                })
                this.http.put(`${this.auth.url}/contrato/estados/1,1,1,0,${this.id_cont}`, {}).subscribe((r: any) =>{
                    this.navCtrl.setRoot(HomePage);
                    this.auth.showAlert("Gracias por Calificar");
                })
            }
        });

        alert.present();
    }

    goToTerminos(){
        this.navCtrl.push(TerminosPage);
    }
}