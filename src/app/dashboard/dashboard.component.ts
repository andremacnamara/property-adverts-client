import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../_services/advert.service';
import { Property } from '../_models/property';
import { AlertifyService } from '../_services/alertify.service';
import { Photo } from '../_models/photo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  properties: Property[];
  photo: Photo[];

  constructor(private advertService: AdvertService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAllProperties();
  }

  getAllProperties() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.advertService.getAllProperties(user.id).subscribe((properties: Property[]) => {
      // console.log(properties[0].photos['url']);
      properties.forEach(property => {
        if (property.photos) {
          property.mainPhotoUrl =  property.photos['url'];
        }
      });
      this.properties = properties;
    }, error => {
      this.alertify.error(error);
    });
  }
}
