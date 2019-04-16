import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvertService } from '../_services/advert.service';
import { Property } from '../_models/property';
import { Photo } from '../_models/photo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { AdvertPhotosComponent } from '../advert-photos/advert-photos.component';
import { AdvertPaymentComponent } from '../advert-payment/advert-payment.component';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {
  @ViewChild('advertPhotos') advertPhotos: AdvertPaymentComponent;

  property: Property;
  photo: Photo;
  user: User;
  advertForm: FormGroup;
  isEditable = false;

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

  bers = [{value: 'A1', display: 'A1'}, {value: 'A2', display: 'A2'}, {value: 'A3', display: 'A3'},
          {value: 'B1', display: 'B1'}, {value: 'B2', display: 'B2'}, {value: 'B3', display: 'B3'},
          {value: 'C1', display: 'C1'}, {value: 'C2', display: 'C2'}, {value: 'C3', display: 'C3'},
          {value: 'D1', display: 'D1'}, {value: 'D2', display: 'D2'}, {value: 'E1', display: 'E1'},
          {value: 'E2', display: 'E2'}, {value: 'F', display: 'F'}, {value: 'G', display: 'G'},
          {value: 'N/A', display: 'N/A'}];

  constructor(private advertService: AdvertService, private alertify: AlertifyService, public authService: AuthService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createAdvertForm();
  }


  createAdvertForm() {
    this.advertForm = this.formBuilder.group({
      id: [, Validators.required],
      town: ['', Validators.required],
      county: ['', Validators.required],
      address: ['', Validators.required],
      postcode: ['', Validators.required],
      eircode: ['', Validators.required],
      property_type: ['', Validators.required],
      selling_type: ['', Validators.required],
      price: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      size: ['', Validators.required],
      building_energy_rating: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitAdvert() {
    // console.log(JSON.stringify(this.authService.user));
      const user = this.authService.currentUser;
      // console.log(user);
      // console.log(user.id);
      if (typeof user !== 'undefined') {
        if (this.advertForm.value) {
          this.property = (Object.assign({}, this.advertForm.value));
          this.property.user_id = user.id;
          this.advertService.createAdvert(user.id, this.property).subscribe(data => {
            this.alertify.success('Success');
          }, error => {
            this.alertify.error(error);
          });
        }
      } else {
        this.alertify.error('Server error. Please try again');
      }
  }
}
