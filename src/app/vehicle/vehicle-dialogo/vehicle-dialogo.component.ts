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

  constructor(
    private dialogRef: MatDialogRef<VehicleDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Vehicle,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicle = new Vehicle();
    this.vehicle.id = this.data.id;
    this.vehicle.serie = this.data.serie;
    this.vehicle.hours = this.data.hours;
    this.vehicle.mark = this.data.mark;
    this.vehicle.description = this.data.description;
    this.vehicle.photo = this.data.photo;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar(){
    if(this.vehicle != null && this.vehicle.id > 0){
      this.vehicleService.modificar(this.vehicle).pipe(switchMap ( ()=> {
        return this.vehicleService.listar();
      })).subscribe(data => {
        this.vehicleService.vehicleCambio.next(data);
      });
    }
    this.dialogRef.close();
  }
}
