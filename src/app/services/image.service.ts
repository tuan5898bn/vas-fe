import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../utils/Constant';

@Injectable({ providedIn: 'root' })
export class ImageService {
   constructor(private http: HttpClient) {


   }

   public uploadImage(file) {
      // const optionHeader = {
      //    headers: new HttpHeaders({
      //       'Authorization': `Client-ID ${Constant.IMGUR_CLIENT_ID}`
      //    })
      // }
      const formData: FormData = new FormData();
      formData.append('image', file);
      return this.http.post(`${Constant.BE_URL}/api/v1/save-image`, formData);
   }

}