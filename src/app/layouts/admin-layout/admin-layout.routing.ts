
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { VehicleComponent } from './../../vehicle/vehicle.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'vehicle', component: VehicleComponent },
];
