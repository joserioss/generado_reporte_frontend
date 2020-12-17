import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkdoneService } from './../_service/workdone.service';
import { Workdone } from './../_model/workdone';
import { RepairmanService } from './../_service/repairman.service';
import { Vehicle } from 'app/_model/vehicle';
import { VehicleService } from 'app/_service/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Repairman } from 'app/_model/repairman';

@Component({
  selector: 'app-workdone',
  templateUrl: './workdone.component.html',
  styleUrls: ['./workdone.component.css']
})
export class WorkdoneComponent implements OnInit {
  
  dataSource: MatTableDataSource<Workdone>;

  vehicles : Vehicle[];
  repairmen : Repairman[];
  workdone: Workdone[];

  fecha: Date = new Date();
  titleWorkdone: string;
  commentary: string;
  detail: string;

  listaWorkdone: Workdone[] = [];
  booleanDescarga: boolean = true;

  idVehicleSeleccionado: number;
  idRepairmanSeleccionado: number;

  constructor(
    private vehicleService : VehicleService,
    private repairmanService : RepairmanService,
    private workdoneService: WorkdoneService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarVehiculos();
    this.listarTecnicos();
    this.listarWorkdone();
  }

  listarVehiculos(){
    this.vehicleService.listar().subscribe( data => {
      this.vehicles = data;
    });
  }

  listarTecnicos(){
    this.repairmanService.listar().subscribe( data => {
      this.repairmen = data;
    });
  }

  listarWorkdone(){
    this.workdoneService.listar().subscribe( data => {
      this.workdone = data;
    });
  }

  estadoBotonRegistrar(){
    return (this.idVehicleSeleccionado === 0 || this.idRepairmanSeleccionado === 0 || this.titleWorkdone == null || this.commentary == null);
  }

  aceptar(){
    let vehicle = new Vehicle();
    vehicle.idVehicle = this.idVehicleSeleccionado;
    let repairman = new Repairman();
    repairman.idRepairman = this.idRepairmanSeleccionado;
 
    let workdoneNuevo =  new Workdone();
    workdoneNuevo.vehicle = vehicle;
    workdoneNuevo.repairman = repairman;
    workdoneNuevo.titleWorkdone = this.titleWorkdone;
    workdoneNuevo.commentary = this.commentary;
    workdoneNuevo.detail = this.detail;
    //ISODATE
    let tzoffset = (this.fecha).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    workdoneNuevo.fecha = localISOTime;

    this.workdoneService.registrar(workdoneNuevo).pipe(switchMap ( ()=> {
      return this.workdoneService.listar();
    } )).subscribe( () => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
      this.listarWorkdone(); //Solucion a problema de no actualizacion de ultimo registro
      this.booleanDescarga = false; //Activacion de descarga ultimo
    });
    setTimeout( () => {
      this.limpiarControles();
    }, 2000);
  }

  verWorkdone(){
    this.listarWorkdone();
    let len = this.workdone.length;
    let ultimoWorkdone = this.workdone[len-1];
    this.descargarReporte(ultimoWorkdone.idWorkdone);
  }

  borrarTodo(){
    this.workdoneService.borrarTodo().subscribe(() => {
      this.booleanDescarga = true;
      return this.booleanDescarga;
    });
  }

  registroOK(){
    return this.booleanDescarga;
  }

  descargarReporte(id: number){
    this.workdoneService.generarReporte(id).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style','display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
    this.borrarTodo();
  }

  limpiarControles(){
    this.titleWorkdone = '';
    this.commentary = '';
    this.detail = '';
    this.idVehicleSeleccionado = 0;
    this.idRepairmanSeleccionado = 0;
    this.fecha = new Date();
  }

}
