import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Vaccine } from "../models/Vaccine";
import { Constant } from "../utils/Constant";

@Injectable({ providedIn: "root" })
export class VaccineService {
  constructor(private http: HttpClient) { }

  public getAllVaccines() {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccines`);
  }

  public getVaccineById(vacId: String) {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccines/${vacId}`);
  }

  public getVaccineByStatus(status: boolean) {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccinesByStatus/${status}`)
  }

  public getAllVaccineTypeWithStatusEqualTrue() {
    return this.http.get(`${Constant.BE_URL}/api/v1/vaccine-type/get/${true}`);
  }

  public createVaccine(vaccine: Vaccine) {
    return this.http.post(`${Constant.BE_URL}/api/v1/vaccines`, vaccine);
  }

  public updateVaccine(vacId: String, vaccine: Vaccine) {
    return this.http.put(`${Constant.BE_URL}/api/v1/vaccines/${vacId}`, vaccine);
  }

  public updateStatus(vacIds: String[]) {
    return this.http.put(`${Constant.BE_URL}/api/v1/vaccines`, vacIds);
  }


  public importFileExcel(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${Constant.BE_URL}/api/v1/vaccines/import-file`, formData);
  }

  public getCountryName() {
    const optionHeader = {
      headers: new HttpHeaders({
        
      })
    }
    return this.http.get(`http://restcountries.eu/rest/v2/all`,optionHeader).pipe(
      map((value:any[]) => {
       return value.map(v=>{return v?.name})
      })
    )
  }
}
