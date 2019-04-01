import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Property } from '../_models/property';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  baseUrl = environment.apiUrl + 'advertisement/';
  propertyId: any;

  constructor(private http: HttpClient) { }

  createAdvert(userId: number, property: Property) {
    return this.http.post(this.baseUrl + userId + '/store', {property});
  }
}
