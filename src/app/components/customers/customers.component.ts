import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';

import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services//user/user.service';
import { Subject } from 'rxjs';

declare var $;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private userService: UserService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };

    this.getCustomers();
  }
  
  getCustomers() {
    this.customerService.getAll().subscribe(
      customers => {
        this.customers = customers;
        this.dtTrigger.next()
      }
    )
  }

  deleteCustomer(customer: Customer) {
    this.customers = this.customers.filter(c => c!== customer)
    this.customerService.delete(customer.id).subscribe()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
