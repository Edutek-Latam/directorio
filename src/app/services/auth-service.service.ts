import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../common/interfaces/login.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../common/interfaces/user.interfaces';
import { JwtHelperService  } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 private _isAuth!: User ;
 private URL_BASE = environment.API_URL;
 private jwtHelper = new JwtHelperService();
  constructor(private _http:HttpClient) {
    this.isAuth;
    //let token = sessionStorage.getItem('isAuth');
   
    //let tokenJson = token ? JSON.parse(token!): false;
    //this._isAuth = tokenJson;
   }

   login(user: Login):Observable<User>{
      return this._http.post<User>(`${this.URL_BASE}/auth`, user)
      .pipe(map(result=>{
        return {...result,rol:["READ_EXTENSION", "CRATE_EXTENSION","UPDATE_EXTENSION","DELETE_EXTENSION", "READ_USER", "CREATE_USER", "RESET_PASSORD"]}
      }));
   }


   get token(){
    return this.isAuth.token
   }

   get isExpired(){

      return this.jwtHelper.isTokenExpired(this.token)
   }

  get isAuth(): User {
      let token = sessionStorage.getItem('isAuth');
      let tokenJson = token ? JSON.parse(token!): false;
      //console.log(tokenJson.auth)
      return tokenJson ? tokenJson.auth : false
      
  }

  set isAuth(test: User){
    let token = {auth:test}
    sessionStorage.setItem('isAuth',JSON.stringify(token))
    this._isAuth = test
  }
}
