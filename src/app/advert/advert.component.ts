import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../_services/advert.service';
import { Property } from '../_models/property';
import { Photo } from '../_models/photo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {

  property: Property;
  photo: Photo;
  user: User;
  advertForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;


  constructor(private advertService: AdvertService, private alertify: AlertifyService, public authService: AuthService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createAdvertForm();
    // this.firstFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  createAdvertForm() {
    this.advertForm = this.formBuilder.group({
      town: ['', Validators.required],
      county: ['', Validators.required],
      address: ['', Validators.required],
      postcode: ['', Validators.required],
      eircode: ['', Validators.required],
      propertyType: ['', Validators.required],
      sellingType: ['', Validators.required],
      price: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      size: ['', Validators.required],
      buildingEnergyRating: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitAdvert() {
    console.log(this.advertForm.value);
    if (this.advertForm.value) {
      this.property = (Object.assign({}, this.advertForm.value));
      this.advertService.createAdvert(this.authService.decodedToken.nameid, this.property).subscribe(() => {
        this.alertify.success('Success');
        console.log(this.property);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
