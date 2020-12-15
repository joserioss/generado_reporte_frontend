import { RepairmanDialogoComponent } from './repairman-dialogo/repairman-dialogo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepairmanService } from './../_service/repairman.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Repairman } from 'app/_model/repairman';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-repairman',
  templateUrl: './repairman.component.html',
  styleUrls: ['./repairman.component.css']
})
export class RepairmanComponent implements OnInit {

  dataSource: MatTableDataSource<Repairman>;
  displayedColumns = ['name', 'position', 'company', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private repairmanService: RepairmanService, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.repairmanService.repairmanCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });

    this.repairmanService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    });

    this.repairmanService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  
  abrirDialogo(repairman?: Repairman) {
    let rep = repairman != null ? repairman : new Repairman();
    this.dialog.open(RepairmanDialogoComponent, {
      data: rep
    });
  }

  eliminar(repairman: Repairman) {
    this.repairmanService.eliminar(repairman.idRepairman).pipe(switchMap(() => {
      return this.repairmanService.listar();
    })).subscribe(data => {
      this.repairmanService.repairmanCambio.next(data);
      this.repairmanService.mensajeCambio.next('SE ELIMINO');
    });
  }
}
