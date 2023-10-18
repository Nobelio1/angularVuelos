import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { environment } from 'src/environments/enviorments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/personas/';
  }

  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  agregarUsuario(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, cliente);
  }

  getClienteId(id: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      cliente
    );
  }
}
