import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Extension } from '../common/interfaces/extension.interfaces';


const API_PATH = 'http://172.210.83.97:3000';

@Injectable({
  providedIn: 'root'
})

export class ExtensionService {
  constructor(private _httpClient: HttpClient) {

   }

  getAll(): Observable<Extension[]>{
    return this._httpClient.get<Extension[]>(`${API_PATH}/extensiones`);
  }

  getByID(id: string): Observable<Extension>{
    return this._httpClient.get<Extension>(`${API_PATH}/extensiones/${id}`)
  }

  update(id: string,data:Extension){
    return this._httpClient.put(`${API_PATH}/extensiones/${id}`,data)
  }
}
