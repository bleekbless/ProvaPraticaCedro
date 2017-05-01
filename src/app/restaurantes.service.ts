import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Restaurante } from "./restaurantes/modelo/restaurante";
import 'rxjs/add/operator/map';

@Injectable()
export class RestaurantesService {

  private URL = '/api/restaurantes';

  constructor(private http: Http) { }

  public getAll(): Observable<Restaurante[]>{
    return this.http.get(this.URL)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Erro no Servidor'));
  }

  public addRestaurante( body: Object ){

    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.URL, this.urlEncode(body), options)
    .map((res:Response) => {
      res.json(); 
    });
  }

  public updateRestaurante(body: Object) {
    
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});

    return this.http.put(`${this.URL}/${body['_id']}`,this.urlEncode(body), options)
    .map((res:Response) => {
      res.json(); 
      console.log(res)
    });

  }

  public removeRestaurante(id: string): Observable<Restaurante[]>{
    return this.http.delete(`${this.URL}/${id}`)
    .map((res:Response) => res.json() )
    .catch((error:any) => Observable.throw(error.json().error || 'Erro no servidor')); 
}

  public urlEncode(obj : Object): string{
    let urlSearchParams = new URLSearchParams();
    for (let key in obj) {
        urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
  }

}
