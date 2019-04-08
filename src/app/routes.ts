import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdvertComponent } from './advert/advert.component';
import { AdvertPhotosComponent } from './advert-photos/advert-photos.component';
import { PropertyShowComponent } from './property-show/property-show.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'advert/create', component: AdvertComponent, canActivate: [AuthGuard]},
    { path: 'photo', component: AdvertPhotosComponent, canActivate: [AuthGuard]},
    { path: 'property/show/:id', component: PropertyShowComponent},
];
