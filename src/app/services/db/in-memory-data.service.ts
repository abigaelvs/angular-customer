import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      {
        username: "abigael",
        password: "wkwkland",
        role: "Admin",
      },
      {
        username: "vaneakh",
        password: "wkwkland",
        role: "Co-Admin",
      },
      {
        username: "avid",
        password: "wkwkland",
        role: "User"
      }
    ];

    const customers = [
      {
        id: "00001",
        custName: "Abigael Vaneakh",
        address:  "Tanah Sareal, Bogor",
        phoneNo: "0895613370019",
        jenisKelamin: "Laki-Laki",
        license: "Free",
        language: ["English", "Indonesian"]
      },
      {
        id: "00002",
        custName: "Vaneakh Abigael",
        address:  "Tanjung Barat, Jakarta Selatan",
        phoneNo: "0895613370019",
        jenisKelamin: "Perempuan",
        license: "Free",
        language: ["English", "Spain"]
      },
      {
        id: "00003",
        custName: "Siregar",
        address:  "Tanjung Barat, Jakarta Selatan",
        phoneNo: "0895613370019",
        jenisKelamin: "Laki-Laki",
        license: "Premium",
        language: ["English", "Indonesian"]
      }
    ];

    return { users, customers };
  }

  genId(customers: Customer[]): string {
    let allCustomer = customers.length;
    return String(allCustomer + 1).padStart(5, "0");
  }
}
