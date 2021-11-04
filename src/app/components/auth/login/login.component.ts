import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: [ "", Validators.required ],
      password: [ "", Validators.required ]
    })
  }

  async login(user: User) {
    if (this.loginForm.valid) {
      const dbUser = await this.userService.getByUsername(user.username).toPromise();

      if (dbUser[0].password == user.password) {
        this.userService.login(dbUser[0]);
        this.router.navigateByUrl("");
        this.alertService.success("Login Success", `Successfully login as s${user.username}`);
      } else {
        this.alertService.error("Login Failed", `Failed login as ${user.username}`)
      }
    } else {
      this.submitted = true;
    }
  }
}


