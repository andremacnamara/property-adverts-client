import { appRoutes } from './routes';

// Components
import { AdvertComponent } from './advert/advert.component';
import { AdvertPaymentComponent } from './advert-payment/advert-payment.component';
import { AdvertPhotosComponent } from './advert-photos/advert-photos.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PropertyShowComponent } from './property-show/property-show.component';
import { RegisterComponent } from './register/register.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { AdvertService } from './_services/advert.service';
import { DatePipe } from '@angular/common';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AdvertComponent,
      AdvertPaymentComponent,
      AdvertPhotosComponent,
      AppComponent,
      DashboardComponent,
      HomeComponent,
      LoginComponent,
      NavComponent,
      PropertyShowComponent,
      RegisterComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FileUploadModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatStepperModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['http://127.0.0.1:8000'],
            blacklistedRoutes: ['http://127.0.0.1:8000']
         }
      })
   ],
   providers: [
      AlertifyService,
      AuthGuard,
      AuthService,
      AdvertService,
      DatePipe

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
