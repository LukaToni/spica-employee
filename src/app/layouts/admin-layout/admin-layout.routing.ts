import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { PresenceComponent } from '../../presence/presence.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'settings',    component: HomeComponent },
    { path: 'employee',     component: EmployeeComponent },
    { path: 'presence',     component: PresenceComponent },
];
