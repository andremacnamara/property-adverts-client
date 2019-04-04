import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder } from '@angular/forms';
import { AdvertService } from '../_services/advert.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Photo } from '../_models/photo';

@Component({
  selector: 'app-advert-photos',
  templateUrl: './advert-photos.component.html',
  styleUrls: ['./advert-photos.component.css']
})
export class AdvertPhotosComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private advertService: AdvertService, private alertify: AlertifyService, public authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeUploader();
  }


  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    const currentProperty = JSON.parse(localStorage.getItem('property'));

    this.uploader = new FileUploader({
      url: this.baseUrl + 'advertisement/' + currentProperty.id + '/upload-image',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain,
        };
        this.photos.push(photo);
      }
    };
  }
}
