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

  async checkLogged(): Promise<Usuario> {
    let idString = localStorage.getItem('logged');
    if (idString == '') {
      return null;
    } else {
      return await this.getUserById(Number(idString));
    }
  }

  async getUserById(id: number): Promise<Usuario> {
    let usuarios = await this.getUserList();
    let usuario = usuarios.find((usuario) => usuario.id == id);
    return usuario;
  }

  private async getUserList(): Promise<Usuario[]> {
    let usuarios = JSON.parse(localStorage.getItem('userId')) as
      | Usuario[]
      | null;
    if (usuarios == null) {
      usuarios = [];
      this.setUserList(usuarios);
    }
    return usuarios;
  }

  private setUserList(usuarios: Usuario[]): void {
    localStorage.setItem('tbUsuarios', JSON.stringify(usuarios));
  }
}
