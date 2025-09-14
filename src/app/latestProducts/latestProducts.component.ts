import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-LatestProducts',

  templateUrl: './LatestProducts.component.html',
  styleUrls: ['./LatestProducts.component.css']
})
export class LatestProductsComponent  implements OnInit{
  arrivalPro: any[] = []


  constructor(
    private proSer : ProductService
  ){

  }

 ngOnInit(): void {
   this.proSer.getHomePagePro().subscribe((res) =>{
     this.arrivalPro = res
     
   })


   
 }



}
