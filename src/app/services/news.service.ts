import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { News } from '../models/News';
import { Constant } from '../utils/Constant';

@Injectable({ providedIn: 'root' })
export class NewsService {
   constructor(private http: HttpClient) { }

   public insert(news: News) {
      return this.http.post(`${Constant.BE_URL}/api/v1/news`, news);
   }


   public getAll() {
      return this.http.get(`${Constant.BE_URL}/api/v1/news`);
   }

   public updateById(newsId: string, news: News) {
      return this.http.put(`${Constant.BE_URL}/api/v1/news/${newsId}`, news);
   }

   public getById(newsId: string) {
      return this.http.get(`${Constant.BE_URL}/api/v1/news/${newsId}`);
   }

   public deleteByIds(ids) {
      const params = {
         'ids': ids
      };
      return this.http.delete(`${Constant.BE_URL}/api/v1/news`, { params});
   }

}