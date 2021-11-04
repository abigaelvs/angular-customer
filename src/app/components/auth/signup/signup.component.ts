import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      username: [ "", Validators.required ],
      password: [ "", Validators.required ]
    })
  }

  signUp(user: User) {
    if (this.signUpForm.valid) {
      this.userService.post(user).subscribe(
        user => {
          this.userService.login(user);
          this.router.navigateByUrl("");
          this.alertService.success("Sign Up Success", "Successfully signup")
        }
      )
    } else {
      this.submitted = true;
    }
  }

}
