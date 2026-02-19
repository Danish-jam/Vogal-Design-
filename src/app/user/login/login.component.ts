import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { FirebaseProService } from 'src/app/Services/firebase-pro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  userEamil: any
  userNotFound!: string
  passwordType: boolean = false


  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private route: ActivatedRoute,
    private firebaseSer: FirebaseProService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })


    this.route.queryParams.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.firebaseSer.getUserById(userId).subscribe((res) => {
          this.loginForm.patchValue({
            email: res.email
          })
        })
      }

    })

  }


  login() {

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.authSer.login(email, password)

  }



  // onSubmit() {
  //   this.authSer.getUserEmail(this.loginForm.value.email).subscribe((res) => {
  //     this.userEamil = res.email == this.loginForm.value.email
  //     console.log(res)

  //     if (!this.userEamil) {
  //       this.userNotFound = "User Not Exist"
  //       this.userEamil
  //       this.loginForm.reset()
  //     } else {
  //       this.authSer.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {
  //         console.log(res);
  //         window.location.href = '/';
  //       })
  //     }
  //   })

  // }

  changeType() {
    this.passwordType = !this.passwordType
  }



  get email() {
    return this.loginForm.get('email');
  }



}
