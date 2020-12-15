import { WorkdoneEdicionComponent } from './../../workdone/workdone-edicion/workdone-edicion.component';
import { WorkdoneComponent } from './../../workdone/workdone.component';
import { RepairmanDialogoComponent } from './../../repairman/repairman-dialogo/repairman-dialogo.component';
import { RepairmanComponent } from './../../repairman/repairman.component';
import { VehicleDialogoComponent } from './../../vehicle/vehicle-dialogo/vehicle-dialogo.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { VehicleComponent } from '../../vehicle/vehicle.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion'



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    VehicleComponent,
    VehicleDialogoComponent,
    RepairmanComponent,
    RepairmanDialogoComponent,
    WorkdoneComponent,
    WorkdoneEdicionComponent,
  ]
})

export class AdminLayoutModule { }
