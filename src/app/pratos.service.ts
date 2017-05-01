import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Prato } from "./pratos/modelo/prato";
import 'rxjs/add/operator/map';

@Injectable()
export class PratosService {

  //Url referente a API de pratos
  private URL = '/api/pratos';

  constructor(private http: Http) { }

  //Busca todos pratos
  public getAll(): Observable<Prato[]>{
    return this.http.get(this.URL)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Erro no servidor'));
  }

  //Adiciona um novo prato
  public addPrato(body: Object){

    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.URL, this.urlEncode(body), options)
    .map((res: Response) => {
      res.json(); 
    });
  }

  //Altera um prato existente
  public updatePrato(body: Object){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});
    
    return this.http.put(`${this.URL}/${body['_id']}`,this.urlEncode(body), options)
      .map((res:Response) => {
        res.json(); 
      });
  }

  //Remove um prato
  public removePrato(id:string): Observable<Prato[]>{

     return this.http.delete(`${this.URL}/${id}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Erro no servidor'));

  }

  //pega o objeto passado pelo component e transforma para x-www-form-urlencoded
  public urlEncode(obj : Object): string{
    let urlSearchParams = new URLSearchParams();
      for (let key in obj) {
        urlSearchParams.append(key, obj[key]);
      }
    return urlSearchParams.toString();
  }

}
