import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarouselDataComponent } from './addCarouseldData/addCarouselData.component';
import { UserAccountsComponent } from './userAccounts/userAccounts.component';
import { AddproComponent } from './addpro/addpro.component';
import { LoginComponent } from '../user/login/login.component';

const routes: Routes = [
  { path: "navForm", component: AddCarouselDataComponent },
  { path: "addpro", component: AddproComponent },
  { path: "product-update/:proid", component: AddproComponent },
  {
    path: 'admin/Users/login/:id',
    component: LoginComponent
  },
  { path: "Users", component: UserAccountsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
