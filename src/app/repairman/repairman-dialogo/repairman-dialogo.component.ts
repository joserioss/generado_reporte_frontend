import { RepairmanService } from './../../_service/repairman.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repairman } from './../../_model/repairman';
import { Component, Inject, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-repairman-dialogo',
  templateUrl: './repairman-dialogo.component.html',
  styleUrls: ['./repairman-dialogo.component.css']
})
export class RepairmanDialogoComponent implements OnInit {

  repairman : Repairman;



  constructor(  
    private dialogRef: MatDialogRef<RepairmanDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Repairman,
    private repairmanService: RepairmanService) { }

  ngOnInit(): void {
    this.repairman = new Repairman();
    this.repairman.idRepairman = this.data.idRepairman;
    this.repairman.name = this.data.name;
    this.repairman.position = this.data.position;
    this.repairman.company = this.data.company;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar(){
    if(this.repairman != null && this.repairman.idRepairman > 0){
      this.repairmanService.modificar(this.repairman).pipe(switchMap ( ()=> {
        return this.repairmanService.listar();
      })).subscribe(data => {
        this.repairmanService.repairmanCambio.next(data);
        this.repairmanService.mensajeCambio.next('SE MODIFICO');
      });
    }
    else{
      this.repairmanService.registrar(this.repairman).pipe(switchMap ( ()=> {
        return this.repairmanService.listar();
      })).subscribe(data => {
        this.repairmanService.repairmanCambio.next(data);
        this.repairmanService.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.dialogRef.close();
  }
  
}
