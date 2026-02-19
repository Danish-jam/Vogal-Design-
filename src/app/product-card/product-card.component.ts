import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { FirebaseProService } from '../Services/firebase-pro.service';

@Component({
  selector: 'app-product-card',

  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
 @Input() allProducts : any;
   showToast : boolean = false;
constructor(private proSer : ProductService, private firebaseSer : FirebaseProService){

}

addtoCart(pro : any){
  this.firebaseSer.addToProFirebaseCart(pro)
    this.showToast = true;

      // 3. Hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 2000)
  }

}

