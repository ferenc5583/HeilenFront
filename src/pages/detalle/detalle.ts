import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'page-detalle',
    templateUrl: 'detalle.html'
})

export class DetallePage {

    before: boolean = false;

    public id_cont: any;

    fecha: any;
    hora: any;
    monto: any;
    calificada: boolean;

    nombre_pro: any;
    apellido_pro: any;
    rut_pro: any;
    especialidad: any;

    testRadioOpen = false;
    testRadioResult: any;

    public id_cali: any;


    constructor(public navParams: NavParams, public http: HttpClient, private auth: AuthService, public alertCtrl: AlertController) {

        this.id_cont = navParams.get('id_cont');

    }

    ngOnInit() {
        this.http.get(`${this.auth.url}/contrato/${this.id_cont}`).subscribe((res: any) => {
            this.fecha = res.fecha;
            this.hora = res.hora;
            this.monto = res.monto;
            this.calificada = res.calificada;

            this.http.get(`${this.auth.url}/user/${res.id_profesional}`).subscribe((res: any) => {
                this.nombre_pro = res.firstname.toUpperCase();
                this.apellido_pro = res.lastname.toUpperCase();
                this.rut_pro = res.rut.toUpperCase();
                this.especialidad = res.id_especialidad.nombre.toUpperCase();
                this.id_cali = res.id_calificacion.id;
            })
        })
    }

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
                //console.log('Ud Calificó con:', data, "al id:", this.id_cali);
                this.testRadioOpen = false;
                this.testRadioResult = data;
                this.http.put(`${this.auth.url}/calificacion/user/${this.id_cali},${data}`, {}).subscribe((res: any) =>{
                    this.before = true;
                })
                this.http.put(`${this.auth.url}/contrato/estados/0,0,1,${this.id_cont}`, {}).subscribe((r: any) =>{
                })
            }
        });

        alert.present();
    }
}