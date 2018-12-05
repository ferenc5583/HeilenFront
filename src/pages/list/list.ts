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

    goToDetalle(item){
        this.navCtrl.push(DetallePage,{
            id_cont: item.id
        });
    }
}