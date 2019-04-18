import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AdvertService } from '../_services/advert.service';
import { AlertifyService } from '../_services/alertify.service';
import { Property } from '../_models/property';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css']
})
export class PropertySearchComponent implements OnInit {

  counties = [{value: 'dublin', display: 'Dublin'}, {value: 'cork', display: 'Cork'}, {value: 'galway', display: 'Galway'}];
  towns    = [{value: 'baldoyle', display: 'Baldoyle'}, {value: 'sutton', display: 'Sutton'}, {value: 'howth', display: 'Howth'}];
  rooms    = [{value: '1', display: '1'}, {value: '2', display: '2'}, {value: '3', display: '3'},
              {value: '4', display: '4'}, {value: '5', display: '5'}, {value: '6', display: '6+'}];
  prices   = [{value: '25000', display: '€25,000'}, {value: '50000', display: '€50,000'}, {value: '75000', display: '€75,000'},
              {value: '100000', display: '€100,000'}, {value: '150000', display: '€150,000'}, {value: '200000', display: '€200,000'},
              {value: '250000', display: '€250,000'}, {value: '300000', display: '€300,000'}, {value: '350000', display: '€350,000'},
              {value: '400000', display: '€400,000'}, {value: '4500000', display: '€450,000'}, {value: '500000', display: '€500,000'},
              {value: '550000', display: '€550,000'}, {value: '600000', display: '€600,000'}, {value: '500000', display: '€650,000'},
              {value: '700000', display: '€700,000'}, {value: '750000', display: '€750,000'}, {value: '800000', display: '€800,000'} ];

  propertytypes = [{value: 'house', display: 'House'}, {value: 'apartment', display: 'Apartment'}, {value: 'Bungalow', display: 'Bungalow'},
                   {value: 'duplex', display: 'Duplex'}];

  sellingTypes = [{value: 'sale', display: 'For Sale'}, {value: 'rent', display: 'For Rent'}];

  searchForm: FormGroup;
  searchParams: any = {};
  properties: Property;

  constructor(private advertService: AdvertService, private alertify: AlertifyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      county: ['', Validators.nullValidator],
      town: ['', Validators.nullValidator],
      min_bedrooms: ['', Validators.nullValidator],
      max_bedrooms: ['', Validators.nullValidator],
      min_bathrooms: ['', Validators.nullValidator],
      max_bathrooms: ['', Validators.nullValidator],
      min_price: ['', Validators.nullValidator],
      max_price: ['', Validators.nullValidator],
      selling_type: ['', Validators.nullValidator],
      property_type: ['', Validators.nullValidator],
    });
  }

  resetFilters() {
    this.searchForm.reset();
    this.properties = null;
  }

  search() {
    this.searchParams = (Object.assign({}, this.searchForm.value));

    const obj = Object.assign({}, this.searchForm.value);
    Object.keys(obj).forEach(key => obj[key] === undefined || obj[key] === null ||  obj[key] === '' ? delete obj[key] : '');
    this.searchParams = obj;
    console.log(this.searchParams);

    this.advertService.propertySearch(this.searchParams).subscribe(data => {
      this.properties = data;

      this.properties.forEach(property => {
        if (property.photos) {
          property.mainPhotoUrl =  property.photos['url'];
          console.log(property.mainPhotoUrl);
        }
      });
      console.log(this.properties);
    }, error => {
      console.log(error);
    });
  }
}
