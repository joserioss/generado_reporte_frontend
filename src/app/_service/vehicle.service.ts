import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Vehicle } from 'app/_model/vehicle';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleCambio = new Subject<Vehicle[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/vehicle`

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Vehicle[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Vehicle>(`${this.url}/${id}`);
  }

  registrar(vehicle : Vehicle){
    return this.http.post(this.url, vehicle);
  }

  modificar(vehicle : Vehicle){
    return this.http.put(this.url, vehicle);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
