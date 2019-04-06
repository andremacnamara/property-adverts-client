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
