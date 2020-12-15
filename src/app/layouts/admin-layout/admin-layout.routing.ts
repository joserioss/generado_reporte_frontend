import { WorkdoneEdicionComponent } from './../../workdone/workdone-edicion/workdone-edicion.component';
import { WorkdoneComponent } from './../../workdone/workdone.component';
import { RepairmanComponent } from './../../repairman/repairman.component';

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { VehicleComponent } from './../../vehicle/vehicle.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'vehicle', component: VehicleComponent },
    { path: 'repairmen', component: RepairmanComponent },
    { path: 'workdone', component: WorkdoneComponent, children: [
        { path: 'nuevo', component: WorkdoneEdicionComponent },
        { path: 'edicion/:id', component: WorkdoneEdicionComponent },
    ]},
];
