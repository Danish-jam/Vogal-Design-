import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
[x: string]: any;
  loginForm!: FormGroup;
  passwordType: boolean = false;
  userNotFound!: string
  @ViewChild('loginErrorToast', { static: true }) loginErrorToast!: ElementRef;

  constructor(private fb: FormBuilder, private authSer: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authSer.login(email, password)
      .then(user => {
        console.log('Login successful', user);
        window.location.href = '/home';
      })
      .catch(err => {
        console.log('Login failed', err);
        // Show Bootstrap toast on error
        const toast = new Toast(this.loginErrorToast.nativeElement, { delay: 3000 });
        toast.show();
      });
  }

  changeType() {
    this.passwordType = !this.passwordType;
  }
}