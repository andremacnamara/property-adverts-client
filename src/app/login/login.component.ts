import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginForm: FormGroup;

  constructor(private alertify: AlertifyService, private authService: AuthService, private fb: FormBuilder, private router: Router) { }


  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Successfully logged in.');
    }, error => {
      this.alertify.error('Invalid Credentials');
    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }

}
