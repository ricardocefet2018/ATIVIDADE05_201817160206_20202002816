import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUri = 'https://api-atividade05.herokuapp.com/api/usuario/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  login(email: string, senha: string): Promise<Usuario> {
    return this.httpClient
      .get(`${this.baseUri}${email}/${senha}/authenticate`)
      .toPromise() as Promise<Usuario>;
  }

  cadastro(usuario: Usuario): Promise<Usuario> {
    if (usuario.id) {
      return this.httpClient
        .put(`${this.baseUri}`, JSON.stringify(usuario), this.httpOptions)
        .toPromise() as Promise<Usuario>;
    } else {
      return this.httpClient
        .post(`${this.baseUri}`, JSON.stringify(usuario), this.httpOptions)
        .toPromise() as Promise<Usuario>;
    }
  }
}
