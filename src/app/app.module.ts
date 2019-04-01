import { appRoutes } from './routes';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      LoginComponent,
      DashboardComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['http://127.0.0.1:8000'],
            blacklistedRoutes: ['http://127.0.0.1:8000']
         }
      })
   ],
   providers: [
      AuthService,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
