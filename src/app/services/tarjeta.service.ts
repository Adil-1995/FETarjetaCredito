import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

 private myAppUrL = 'https://localhost:44337/'
 private myApiUrL = 'api/Tarjeta/'

  constructor(private http: HttpClient) { }


  getTarjetas(): Observable<any>{
    return this.http.get(this.myAppUrL+ this.myApiUrL);
  }

  deleteTarjeta(id: number): Observable<any>{
    return this.http.delete(this.myAppUrL+ this.myApiUrL + id);
  }

  saveTarjeta(tarjeta: any): Observable<any>{
    return this.http.post(this.myAppUrL+ this.myApiUrL, tarjeta);
  }

  updateTarjeta(id: number, tarjeta: any): Observable<any>{
    return this.http.put(this.myAppUrL+ this.myApiUrL + id,tarjeta)

  }
}
