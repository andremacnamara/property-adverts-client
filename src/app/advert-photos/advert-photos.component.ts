import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder } from '@angular/forms';
import { AdvertService } from '../_services/advert.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Photo } from '../_models/photo';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-advert-photos',
  templateUrl: './advert-photos.component.html',
  styleUrls: ['./advert-photos.component.css']
})

export class AdvertPhotosComponent implements OnInit {

  baseUrl = environment.apiUrl;
  selectedFile: File;

  constructor(private http: HttpClient, private advertService: AdvertService, 
    private alertify: AlertifyService, public authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const currentProperty = localStorage.getItem('property');
    const propertyId = JSON.parse(currentProperty)['id'];

    const uploadData = new FormData();
    uploadData.append('image_name', this.selectedFile, this.selectedFile.name);

    this.advertService.createAdvertPhoto(propertyId, uploadData)
      .subscribe(data => {
            this.alertify.success('Success');
          }, error => {
            this.alertify.error(error);
          });
  }

}
