import { Injectable } from '@angular/core';
import { Conta } from '../models/conta';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  url = 'https://api-atividade05.herokuapp.com/api/conta/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  async listar() {
    try {
      return await this.httpClient.get(this.url).toPromise();
    } catch (err) {
      return err;
    }
  }

  async salvar(conta: Conta) {
    if (conta.id == null) {
      try {
        return await this.httpClient
          .post(this.url, JSON.stringify(conta), this.httpOptions)
          .toPromise();
      } catch (err) {
        return err;
      }
    } else {
      try {
        return await this.httpClient
          .put(this.url, JSON.stringify(conta), this.httpOptions)
          .toPromise();
      } catch (err) {
        return err;
      }
    }
  }

  async getById(id: number) {
    try {
      return await this.httpClient.get(this.url + id.toString()).toPromise();
    } catch (err) {
      return err;
    }
  }

  async delete(id: number) {
    try {
      return await this.httpClient.delete(this.url + id.toString()).toPromise();
    } catch (err) {
      return err;
    }
  }

  async isExists(numero: string) {
    try {
      return await this.httpClient
        .get(this.url + numero + '/exists')
        .toPromise();
    } catch (err) {
      return err;
    }
  }
}
