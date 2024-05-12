import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Extension } from '../common/interfaces/extension.interfaces';
import { AuthServiceService } from './auth-service.service';
import { environment } from '../../environments/environment';


const API_PATH = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {
  constructor(private _httpClient: HttpClient, private _authService: AuthServiceService) {

   }

  getAll(): Observable<Extension[]>{
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this._authService.token}`)
    return this._httpClient.get<Extension[]>(`${API_PATH}/extensiones`,{headers});
  }

  getByID(id: string): Observable<Extension>{
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this._authService.token}`)
    
    return this._httpClient.get<Extension>(`${API_PATH}/extensiones/${id}`)
  }

  update(id: string,data:Extension){
    return this._httpClient.put(`${API_PATH}/extensiones/${id}`,data)
  }

  ceate(extension:Extension): Observable<Extension>{
    //if(extension instanceof Extension) return
    return this._httpClient.post<Extension>(`${API_PATH}/extensiones`,extension);
  }

  remove(id: string){
    return this._httpClient.delete<Extension>(`${API_PATH}/extensiones/${id}`)
  }
}
