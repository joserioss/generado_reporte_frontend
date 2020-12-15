import { VehicleService } from './../../_service/vehicle.service';
import { Vehicle } from './../../_model/vehicle';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-dialogo',
  templateUrl: './vehicle-dialogo.component.html',
  styleUrls: ['./vehicle-dialogo.component.css']
})
export class VehicleDialogoComponent implements OnInit {

  vehicle : Vehicle;

  archivosSeleccionados: FileList;
  archivoSeleccionado: File;
  nombreArchivo: string;

  imagenData: any;
  imagenEstado: boolean;

  constructor(
    private dialogRef: MatDialogRef<VehicleDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Vehicle,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicle = new Vehicle();
    this.vehicle.idVehicle = this.data.idVehicle;
    this.vehicle.serie = this.data.serie;
    this.vehicle.hours = this.data.hours;
    this.vehicle.equipment = this.data.equipment;
    this.vehicle.ot = this.data.ot;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar(){
    if(this.vehicle != null && this.vehicle.idVehicle > 0){
      this.vehicleService.modificar(this.vehicle).pipe(switchMap ( ()=> {
        return this.vehicleService.listar();
      })).subscribe(data => {
        this.vehicleService.vehicleCambio.next(data);
        this.vehicleService.mensajeCambio.next('SE MODIFICO');
      });
    }
    else{
      this.vehicleService.registrar(this.vehicle).pipe(switchMap ( ()=> {
        return this.vehicleService.listar();
      })).subscribe(data => {
        this.vehicleService.vehicleCambio.next(data);
        this.vehicleService.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.dialogRef.close();
  }

  descargarReporte(){
    this.vehicleService.generarReporte(this.data.idVehicle).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style','display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
      this.vehicleService.mensajeCambio.next('PDF Generado');
    });
  }

  seleccionarArchivo(e: any){
    this.nombreArchivo = e.target.files[0].name;
    this.archivosSeleccionados = e.target.files;
  }

  subirArchivo(){
    this.archivoSeleccionado = this.archivosSeleccionados.item(0);
    this.vehicleService.guardarArchivo(this.archivoSeleccionado).subscribe( data => {
      console.log(data);
    });
  }
}
