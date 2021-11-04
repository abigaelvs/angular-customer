import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { AppComponent } from 'src/app/app.component';
import { CustomerService } from 'src/app/services/customer/customer.service';

import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailComponent ],
      imports: [ RouterTestingModule, HttpClientModule, ReactiveFormsModule ],
      providers: [ CustomerService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it("customer name validity", () => {
    let custName = component.customerForm.controls["custName"];
    console.log("=== CUSTOMER NAME ===")
    console.log(custName.valid)
    console.log("=== CUSTOMER NAME === ")
    expect(custName.valid).toBeTruthy();
  })
});
