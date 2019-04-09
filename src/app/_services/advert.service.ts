import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Property } from '../_models/property';
import { User } from '../_models/user';
import { Payment } from '../_models/payment';
import { map } from 'rxjs/operators';
import { Photo } from '../_models/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  baseUrl = environment.apiUrl + 'property/';
  currentProperty: any;

  constructor(private http: HttpClient) { }

  createAdvert(userId: number, property: Property) {
    return this.http.post(this.baseUrl + userId + '/store', {property}).pipe(
      map((response: any) => {
        localStorage.setItem('property', JSON.stringify(response));
      })
    );
  }

  createAdvertPayment(propertyId: number, payment: Payment) {
    return this.http.post(this.baseUrl + propertyId + '/payment', {payment});
  }

  createAdvertPhoto(propertyId: number,  uploadData = new FormData()) {
    return this.http.post(this.baseUrl + propertyId + '/upload-image', uploadData);
  }

  getAllProperties(userId: number) {
    return this.http.get(this.baseUrl + userId + '/all');
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(this.baseUrl + id + '/show');
  }

  sendEmail(sellerId: number, model: any) {
    return this.http.post(this.baseUrl + sellerId + '/mail', model);
  }
}
