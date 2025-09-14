import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarouselDataComponent } from './addCarouseldData/addCarouselData.component';
import { UserAccountsComponent } from './userAccounts/userAccounts.component';
import { AddproComponent } from './addpro/addpro.component';


const routes: Routes = [
  {
    path: "admin", children: [
      {
        path: "navForm",
        component: AddCarouselDataComponent
      },
      {
        path: "addpro",
        component: AddproComponent
      }, {
        path: "product-update/:proid",
        component: AddproComponent
      }, {
        path: "Users",
        component: UserAccountsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
