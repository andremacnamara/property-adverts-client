import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdvertService } from '../_services/advert.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Payment } from '../_models/payment';

@Component({
  selector: 'app-advert-payment',
  templateUrl: './advert-payment.component.html',
  styleUrls: ['./advert-payment.component.css']
})

export class AdvertPaymentComponent implements OnInit {
  advertPaymentForm: FormGroup;
  model: any;
  payment: Payment;
  constructor(private advertService: AdvertService, private alertify: AlertifyService, public authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createAdvertPaymentForm();
  }

  createAdvertPaymentForm() {
    this.advertPaymentForm = this.formBuilder.group({
      town: ['', Validators.required],
      county: ['', Validators.required],
      billing_address: ['', Validators.required],
      cardnumber: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  submitPayment() {
    if (this.advertPaymentForm.value) {
      this.payment = (Object.assign({}, this.advertPaymentForm.value));
      console.log(this.payment);
      this.advertService.createAdvertPayment(2, this.payment).subscribe(data => {
        this.alertify.success('Success');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

}
