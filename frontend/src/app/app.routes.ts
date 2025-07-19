import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
    
];
