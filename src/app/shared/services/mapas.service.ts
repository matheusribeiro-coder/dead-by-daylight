import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mapa } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  constructor(private _http: HttpClient) { }

  public buscarTodos(): Observable<Mapa[]> {
    return this._http.get<Mapa[]>('http://localhost:3000/mapas')
  }
}
