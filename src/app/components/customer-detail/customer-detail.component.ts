import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  customerForm: FormGroup;
  languageList: string[] = ["Indonesian", "English", "Spain"]
  formLanguages: string[];

  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  createCustomerForm(customer: Customer) {
    this.customerForm = this.fb.group({
      custName: [customer.custName, Validators.required],
      address: [customer.address, Validators.required],
      phoneNo: [customer.phoneNo, Validators.required],
      jenisKelamin: [customer.jenisKelamin, Validators.required],
      license: [customer.license, Validators.required],
      language: [customer.language, Validators.required],
    })
  }

  getCustomer() {
    const id = String(this.route.snapshot.paramMap.get("id"));
    this.customerService.getById(id).subscribe(
      customer => {
        this.customer = customer
        this.createCustomerForm(customer)
        this.formLanguages = this.customerForm.controls["language"].value
        console.log(this.formLanguages)
      }
    )
  }

  filterLanguage(l: string) {
    const f = this.formLanguages.filter( (value) => value == l )
    if (f.length > 0) {
      return true;
    }
    return false
  }

  goBack() {
    this.location.back()
  }

  save(customer: Customer) {
    customer.id = this.route.snapshot.params.id;
    this.customerService.put(customer, this.route.snapshot.params.id).subscribe(
      customer => this.goBack()
    )
  }

}
