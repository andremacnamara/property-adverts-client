import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  baseUrl = environment.apiUrl;
  title = 'PropertyAdverts-Client';

  values: any;


  constructor (private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://127.0.0.1:8000/api/properties').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

}

