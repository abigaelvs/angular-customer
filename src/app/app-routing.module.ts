import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { AuthGuard } from './components/auth/auth.guard';
import { Role } from './models/role';

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "customers", component: CustomersComponent, canActivate: [AuthGuard]},
  {path: "customers/add", component: AddCustomerComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin, Role.CoAdmin]}},
  {path: "customers/:id", component: CustomerDetailComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin, Role.CoAdmin]}},

  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
