import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ HttpClientModule, RouterTestingModule, ReactiveFormsModule ],
      providers: [ UserService, AlertService, LocalStorageService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("username field validity", () => {
    let username = component.signUpForm.controls["username"];
    console.log("=== USERNAME ===")
    console.log(username.valid)
    console.log("=== USERNAME === ")
    expect(username.valid).toBeFalsy();
  })

});
