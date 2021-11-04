import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.userService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.userService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.userService.isLoggedIn();
    this.username = this.userService.getLocalUsername();
  }

  logout() {
    // const username = this.localStorage.retrieve("username");
    // this.localStorage.clear("username");
    // this.router.navigateByUrl("/login");
    // this.alertService.successAlert("Logout Success", `Successfully logout as ${username}`)
    this.userService.logout();
    this.router.navigateByUrl("/login");
    this.alertService.success("Logout Success", "Successfully Logout");
  }

  loginCheck() {
    this.userService.loggedIn.subscribe(
      (data: boolean) => {
        this.isLoggedIn = data;
        console.log("Logged in or not", data)
      }
    )
    this.userService.loggedIn.subscribe(
      (data: string) => this.username = data
    )

    this.isLoggedIn = this.userService.isLoggedIn();
    this.username = this.userService.getLocalUsername();
  }

  isAdmin() {
    return this.userService.getLocalRole() == Role.Admin || this.userService.getLocalRole() == Role.CoAdmin;
  }

}
