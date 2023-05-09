import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Constant } from '../utils/Constant';
import { VaccineType } from '../models/vaccine-type';


@Injectable({
  providedIn: 'root'
})
export class VaccineTypeService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccine-type/get`);
  }
  public getAllByStatus(status: boolean) {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccine-type/get/${status}`);
  }
  public createVaccineType(vaccineType: VaccineType){
    return this.http.post(`${Constant.BE_URL}/api/v1/vaccine-type/add`, vaccineType);
  }
  public updateVaccineType(vaccineType: VaccineType){
    return this.http.post(`${Constant.BE_URL}/api/v1/vaccine-type/update`, vaccineType);
  }
  public getById(id: string) {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccine-type/${id}`)
 }
 public inActive(ids) {
  const params = {
     'ids': ids
  };
  console.log(ids)
  return this.http.put(`${Constant.BE_URL}/api/v1/vaccines-type/make-inactive`,null, {params});
}

}
