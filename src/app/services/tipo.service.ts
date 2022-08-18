import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  baseUri = 'https://api-atividade05.herokuapp.com/api/tipo/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  async list() {
    return this.httpClient.get(this.baseUri).toPromise();
  }

  async excluir(id: number) {
    return this.httpClient.delete(this.baseUri + id).toPromise();
  }

  async buscarPorId(id: number) {
    return this.httpClient.get(this.baseUri + id).toPromise();
  }

  async salvar(tipo: Tipo) {
    if (tipo.id) {
      return this.httpClient
        .put(this.baseUri, JSON.stringify(tipo), this.httpOptions)
        .toPromise();
    } else {
      return this.httpClient
        .post(this.baseUri, JSON.stringify(tipo), this.httpOptions)
        .toPromise();
    }
  }

  async isExist(descricao: string) {
    return this.httpClient
      .get(this.baseUri + descricao + '/exists')
      .toPromise();
  }
}
