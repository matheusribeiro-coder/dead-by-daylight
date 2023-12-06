import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personagem } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private _http: HttpClient) { }

  public buscarTodos(): Observable<Personagem[]> {
    return this._http.get<Personagem[]>('http://localhost:3000/characters')
  }

  public buscarAssasinos(): Observable<Personagem[]> {
    return this._http.get<Personagem[]>('http://localhost:3000/characters?role=assassin')
  }

  public buscarSobreviventes(): Observable<Personagem[]> {
    return this._http.get<Personagem[]>('http://localhost:3000/characters?role=survivor')
  }

  public buscarPersonagemPorId(id: string): Observable<Personagem> {
    return this._http.get<Personagem>(`http://localhost:3000/characters?id=${id}`)
  }

  public buscarPersonagemPorNome(search: string): Observable<Personagem> {
    return this._http.get<Personagem>(`http://localhost:3000/characters?name=${search}`)
  }
}
