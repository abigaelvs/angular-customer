import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer, CustomerBase } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl: string = "api/customers";
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, this.httpOptions)
  }

  getById(id: string): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url, this.httpOptions)
  }

  getByName(name: string): Observable<Customer> {
    const url = `${this.apiUrl}?custName=${name}`;
    return this.http.get<Customer>(url, this.httpOptions)
  }

  post(customer: CustomerBase): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  delete(id: string): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Customer>(url, this.httpOptions)
  }

  put(customer: CustomerBase, id: string): Observable<CustomerBase> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CustomerBase>(url, customer);
  }
}
