import { Injectable } from '@angular/core';
import { Vuelos } from '../interfaces/vuelos.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviorments';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VuelosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/vuelos/';
  }

  getVuelos(): Observable<Vuelos[]> {
    return this.http.get<Vuelos[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  eliminarVuelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  agregarVuelo(vuelo: Vuelos): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, vuelo);
  }

  getVuelosId(id: number): Observable<Vuelos[]> {
    return this.http.get<Vuelos[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateCliente(id: number, vuelo: Vuelos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, vuelo);
  }
}
