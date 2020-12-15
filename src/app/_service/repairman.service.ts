import { environment } from '../../environments/environment';
import { Repairman } from '../_model/repairman';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairmanService {
  repairmanCambio = new Subject<Repairman[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/repairmen`

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Repairman[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Repairman>(`${this.url}/${id}`);
  }

  registrar(repairman : Repairman){
    return this.http.post(this.url, repairman);
  }

  modificar(repairman : Repairman){
    return this.http.put(this.url, repairman);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
