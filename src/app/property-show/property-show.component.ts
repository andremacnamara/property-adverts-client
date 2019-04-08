import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AdvertService } from '../_services/advert.service';
import { DatePipe } from '@angular/common';
import { Property } from '../_models/property';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-show',
  templateUrl: './property-show.component.html',
  styleUrls: ['./property-show.component.css']
})

export class PropertyShowComponent implements OnInit {

  property: Property;

  constructor(private advertService: AdvertService, private alertify: AlertifyService, private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getProperty();
  }

  getProperty() {
    this.advertService.getProperty(+this.route.snapshot.params['id']).subscribe((property: Property) => {
      this.property = property;
      if (property.photos) {
        property.mainPhotoUrl =  property.photos['url'];
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
