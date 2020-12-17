import { Workdone } from './../_model/workdone';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkdoneService {

  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/workdone`;

  constructor(
    private http : HttpClient
  ) { }

  listar(){
    return this.http.get<Workdone[]>(this.url);
  }

  registrar(workdone: Workdone) {
    return this.http.post(this.url, workdone);
  }

  borrarTodo(){
    return this.http.get( `${this.url}/deleteAll`);
  }

  generarReporte(id: number){
    return this.http.get(`${this.url}/${id}/reporte`, {
      responseType: 'blob'
    });
  }
}
