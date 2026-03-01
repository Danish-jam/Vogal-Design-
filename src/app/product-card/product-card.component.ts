import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { FirebaseProService } from '../Services/firebase-pro.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-product-card',

  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() allProducts: any;
  showToast: boolean = false;
  constructor(private proSer: ProductService, private cartSer: CartService) {

  }
 
ngOnInit(): void {
 
  
}



  addtoCart(pro: any) {
    console.log(pro);
    
    this.cartSer.addToCart(pro)
    this.showToast = true;

    // 3. Hide toast after 3 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 2000)
  }

}

