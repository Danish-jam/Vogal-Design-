import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminGuard } from '../guards/admin.guard';
import { HomeComponent } from '../home/home.component';
const routes: Routes = [
  {
    path: "user", children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AdminGuard]
      },
      {
        path: "login",
        component: LoginComponent
      }, {
        path: "login/sign",
        component: SignupComponent
      },
      {
        path: "signup",
        component: SignupComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
