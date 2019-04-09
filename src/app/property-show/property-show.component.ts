import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AdvertService } from '../_services/advert.service';
import { DatePipe } from '@angular/common';
import { Property } from '../_models/property';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';

@Component({
  selector: 'app-property-show',
  templateUrl: './property-show.component.html',
  styleUrls: ['./property-show.component.css']
})

export class PropertyShowComponent implements OnInit {

  property: Property;
  user: User;
  mailForm: FormGroup;
  mail: any;


  constructor(private advertService: AdvertService, private alertify: AlertifyService, private route: ActivatedRoute,
    private datePipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProperty();
    this.createMailForm();
  }

  getProperty() {
    this.advertService.getProperty(+this.route.snapshot.params['id']).subscribe((property: Property) => {
      this.property = property;
      this.user = property.user;
      console.log('USER' + property.user);
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

  createMailForm() {
    this.mailForm = this.formBuilder.group({
      name: [, Validators.required],
      email: [, Validators.required],
      number: [, Validators.required],
      message: [, Validators.required],
      property: [],
    });
  }

  submitEmail() {
    this.mail = (Object.assign({}, this.mailForm.value));
    this.mail.property = this.property;
    const sellerId = this.user.id;
    this.advertService.sendEmail(sellerId, this.mail).subscribe(data => {
      this.alertify.success('Message successfully sent');
    }, error => {
      this.alertify.error(error);
    });
  }
}
