import { Injectable } from '@angular/core';
import { Extension } from '../common/interfaces/extension.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _extension?: Extension  ;
  constructor() { 
    let dataLocalStorage = localStorage.getItem('extension');
    this._extension =  dataLocalStorage? JSON.parse(dataLocalStorage): null;
  }

  set extension(valor: Extension){
    localStorage.setItem('extension',JSON.stringify(valor));
    //this._extension = valor;
  }

  get extension(){
    let dataLocalStorage = localStorage.getItem('extension');
    this._extension =  dataLocalStorage? JSON.parse(dataLocalStorage): null;
    return this._extension!;
  }

  clear(){
    localStorage.removeItem('extension')
  }
}
