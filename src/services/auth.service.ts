import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
   userName: string;
   loggedIn: boolean;
   url = 'http://192.168.0.106:8081';
   //url para sever en lan: http://192.168.0.106:8081
   //url para sever solo en equipo: http://localhost:8081

   constructor(private http: Http) {
      this.userName = '';
      this.loggedIn = false;
   }
   
   login(userInfo) {
      let url = `${this.url}/auth`;
      let iJon = JSON.stringify(userInfo);

      return this.http.post(url, iJon, {
         headers: new Headers({
            'Content-Type':'application/json'
         })
      })
      .map(res => res.json())
      .map(res => {
         if (res=="error" || res=="nofound"){
            this.loggedIn = false;
         } else {
            localStorage.setItem('token', res.token);
            this.userName = userInfo.user;
            this.loggedIn = true;
         }
         return this.loggedIn;
      });
   }

   logout(): void {
      localStorage.removeItem('token');
      this.userName = '';
      this.loggedIn = false;
   }

   isLoggedIn() {
      return this.loggedIn;
   }
}