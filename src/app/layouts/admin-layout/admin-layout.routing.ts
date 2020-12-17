import { WorkdoneComponent } from './../../workdone/workdone.component';
import { RepairmanComponent } from './../../repairman/repairman.component';

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { VehicleComponent } from './../../vehicle/vehicle.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'vehicle', component: VehicleComponent },
    { path: 'repairmen', component: RepairmanComponent },
    { path: 'workdone', component: WorkdoneComponent },
];
