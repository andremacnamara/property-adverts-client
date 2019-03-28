import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  baseUrl = environment.apiUrl;
  title = 'PropertyAdverts-Client';
  names: any;
  state: any;

  constructor (private http: HttpClient, private test: TestService) {}

  ngOnInit() {
    this.dataService();
  }

  dataService() {
    this.test.dataService().subscribe(data => {
      // this.names = data['name'];
      console.log('T' + JSON.stringify(data));
    }, error => {
      console.log('F' + JSON.stringify(error));
    });
  }


}

