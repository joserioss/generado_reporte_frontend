import { VehicleDialogoComponent } from './vehicle-dialogo/vehicle-dialogo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'app/_model/vehicle';
import { VehicleService } from 'app/_service/vehicle.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  dataSource: MatTableDataSource<Vehicle>;
  displayedColumns = [ 'id', 'serie', 'hours', 'mark', 'acciones']; 
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private vehicleService : VehicleService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.vehicleService.vehicleCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });

    this.vehicleService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(vehicle : Vehicle){
    this.dialog.open(VehicleDialogoComponent,{
      width: '400px',
      data:vehicle
    });
  }
}
