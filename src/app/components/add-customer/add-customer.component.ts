import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services//alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';


import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  custName: string;
  address: string;
  phoneNo: string;
  jenisKelamin: string;
  license: string;

  languageList: string[] = ["Indonesian", "English", "Spain"]
  languages: string[] = []

  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private location: Location) { }

  ngOnInit(): void {
  }

  onLanguageCheck(e) {
    const id: string = e.target.attributes.id.value;
    const l = this.languageList.filter( (value) => value == id )

    if (l) {
      this.languages.push(l[0])
    }
  } 

  onSubmit() {
    if (!this.custName) {
      alert("Please add Customer Name");
      return;
    }
    if (!this.address) {
      alert("Please add Address");
      return;
    }
    if (!this.phoneNo) {
      alert("Please add Phone Number");
      return;
    }

    const newCustomer = {
      custName: this.custName,
      address: this.address,
      phoneNo: this.phoneNo,
      jenisKelamin: this.jenisKelamin,
      license: this.license,
      language: this.languages
    }

    this.customerService.post(newCustomer).subscribe(
      () => {
        this.goBack();
        this.alertService.success("Success", "Successfully added customer")
      }
    )
  }

  goBack(): void {
    this.location.back()
  }

}
