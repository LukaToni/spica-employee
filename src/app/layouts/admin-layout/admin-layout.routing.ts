import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { NewEmployeeComponent } from '../../employee/create/create.component';
import { PresenceComponent } from '../../presence/presence.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'settings',    component: HomeComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'employee/create', component: NewEmployeeComponent },
    { path: 'presence',     component: PresenceComponent },
];