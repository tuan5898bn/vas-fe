import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../utils/Constant';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  public getReportVaccineByType() {
    return this.http.get(`${Constant.BE_URL}/api/v1/report/vaccines`);
  }
  public getReportChart(){
    return this.http.get(`${Constant.BE_URL}/api/v1/report/vaccine-chart`)
  }
}
