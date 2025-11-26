import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Characters, CharactersResponse } from '../common/api-interfaz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url ="https://dragonball-api.com/api/characters";
  constructor(private http: HttpClient) { }
  
  getCharacters(): Observable<Characters[]>{
    return this.http.get<CharactersResponse>(this.url).pipe(
      map(response => response.items)
    );
  }

  getCharactersByPage(page: number): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${this.url}?page=${page}`);
  }

  getCharacterById(id: number): Observable<Characters> {
    return this.http.get<Characters>(`${this.url}/${id}`);
  }
}
