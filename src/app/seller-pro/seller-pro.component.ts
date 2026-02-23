import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";


@Component({
  selector: 'app-seller-pro',

  templateUrl: './seller-pro.component.html',
  styleUrls: ['./seller-pro.component.css']
})
export class SellerProComponent implements OnInit {

  allSellerPro !: any[]
  allPro: any
  constructor(
    private proSer: ProductService
  ) {

  }


  ngOnInit(): void {
    this.proSer.getProducts().subscribe((res) => {
      this.allPro = res.filter(pro => pro.showOnHomePage == "true")
      this.allSellerPro = this.allPro.filter((pro: { category: string; }) => pro.category == "New Arrivals")
      console.log( this.allSellerPro);

    })
  }


  addtoCart(item: any) {
    this.proSer.addToCart(item)
  }


}

