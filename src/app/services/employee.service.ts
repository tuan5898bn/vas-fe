import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constant } from '../utils/Constant';
import { Employee } from '../models/Employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
   constructor(private http: HttpClient) { }


   public getAll() {
      return this.http.get(`${Constant.BE_URL}/api/v1/employees`);
   }

   public create(employee: Employee) {
      return this.http.post(`${Constant.BE_URL}/api/v1/employees`, employee);
   }

   public getById(empId: string) {
      return this.http.get(`${Constant.BE_URL}/api/v1/employees/${empId}`)
   }
   public updateById(empId: string, employee: Employee) {
      return this.http.put(`${Constant.BE_URL}/api/v1/employees/${empId}`, employee);
   }
   public deleteByIds(ids) {
      const params = {
         'ids': ids
      };
      return this.http.delete(`${Constant.BE_URL}/api/v1/employees`, { params});
   }


}
