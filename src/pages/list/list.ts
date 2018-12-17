import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DetallePage } from '../detalle/detalle';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})

export class ListPage {

    contratos: any;

    token = localStorage.getItem('token');

    constructor(public navCtrl: NavController, public http: HttpClient, private auth: AuthService) {
    }

    ngOnInit() {
        this.http.get(`${this.auth.url}/contrato/miscontratos/`, { headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token } })
            .subscribe((res: any) => {
                this.contratos = res;
            })
    }

    goToDetalle(item) {
        this.navCtrl.push(DetallePage, {
            id_cont: item.id
        });
    }

    doRefresh(refresher) {
        //durante la carga
        this.ngOnInit();

        setTimeout(() => {
            //despues de cargar
            refresher.complete();
        }, 500);
    }

    initializeItems() {
        this.contratos;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.contratos = this.contratos.filter((item) => {
                return (item.fecha.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.hora.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.monto.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.ngOnInit();
        }
    }
}