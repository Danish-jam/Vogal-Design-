import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  passwordType: boolean = false
  newUser!: FormGroup
  constructor(
    private fb: FormBuilder,
    private authSer: AuthService
  ) {

  }
  ngOnInit(): void {

    this.newUser = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }


  signup() {
    this.authSer.signup(
      this.newUser.get('fname')?.value, 
      this.newUser.get('lname')?.value, 
      this.newUser.get('email')?.value, 
      this.newUser.get('password')?.value,
    )
  }

  // resgister() {
  //   this.authSer.postUser(this.newUser.value).subscribe((res) => {
  //     console.log(res);
  //     this.newUser.reset()
  //     window.location.href = '/user/login';
  //   })

  // }


  changeType() {
    this.passwordType = !this.passwordType
  }

  get email() {
    return this.newUser.get('email');
  }
  get firstName() {
    return this.newUser.get('firstName');
  }


}
