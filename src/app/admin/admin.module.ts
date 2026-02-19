import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserAccountsComponent } from './userAccounts/userAccounts.component';
import { AddproComponent } from './addpro/addpro.component';
import { AddCarouselDataComponent } from './addCarouseldData/addCarouselData.component';

@NgModule({
  declarations: [
    UserAccountsComponent,
    AddproComponent,
    AddCarouselDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
