import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; //npm install rxjs-compat

@Injectable()
export class Post {
  //server: string = 'http://localhost:80/api_show/';
  server: string = 'http://www.sedsoft.com.br/app_music/api/';

  constructor(private http: HttpClient) {

  }
  dadosApi(dados: any, api: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    let url = this.server + api;
    return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
  }
}