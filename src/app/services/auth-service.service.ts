import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 private _isAuth: boolean = false;
  constructor() { }

  get isAuth(){
      let token = sessionStorage.getItem('isAuth');
      console.log(token)
      let tokenJson = JSON.parse(token!);
      console.log(tokenJson.auth)
      return token ? tokenJson.auth : false
      //return this._isAuth
  }

  set isAuth(test: boolean){
    let token = {auth:test}
    sessionStorage.setItem('isAuth',JSON.stringify(token))
    this._isAuth = test
  }
}
