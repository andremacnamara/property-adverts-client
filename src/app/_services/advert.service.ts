import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Property } from '../_models/property';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  baseUrl = environment.apiUrl + 'advertisement/';

  constructor(private http: HttpClient) { }

  createAdvert(id: number, property: Property) {
    return this.http.post(this.baseUrl + 'store', {property});
  }
}
