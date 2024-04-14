import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 private _isAuth: boolean = false;
  constructor() {
    //let token = sessionStorage.getItem('isAuth');
   
    //let tokenJson = token ? JSON.parse(token!): false;
    //this._isAuth = tokenJson;
   }

  get isAuth(){
      let token = sessionStorage.getItem('isAuth');
      let tokenJson = token ? JSON.parse(token!): false;
      return token ? tokenJson.auth : false
      
  }

  set isAuth(test: boolean){
    let token = {auth:test}
    sessionStorage.setItem('isAuth',JSON.stringify(token))
    this._isAuth = test
  }
}
