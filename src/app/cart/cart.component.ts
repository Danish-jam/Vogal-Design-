import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { AuthService } from '../Services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseProService } from '../Services/firebase-pro.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  constructor(
    private proSer: ProductService,
    private authSer: AuthService,
    private firestore: AngularFirestore,
    private firebaseSer : FirebaseProService
  ) { }

  cartItems: any[] = [];
  cartlength: any;
  spinner : boolean = false

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    const userid = userInfo.uid;

    this.firestore.collection('cart').doc(userid).get().subscribe((doc: any) => {
      if (doc.exists) {
        this.cartItems = doc.data().items || [];
        this.cartlength = this.cartItems.length;
      } else {
        this.cartItems = [];
        this.cartlength = 0;
      }
    });

    setTimeout(() => {
      this.spinner = true
    }, 3000);

  // this.proSer.getCartByUserId(userid).subscribe((res) => {
  //   this.cartItems = res
  //   console.log(this.cartItems);
  //   this.cartlength = res[0].items.length
  // })

}

  get totalItems() {
  return this.cartItems.reduce((acc: any, item) => acc + item.quantity, 0);
}

  get totalPrice() {
  return this.cartItems.reduce((acc: number, item) => acc + item.price * item.quantity, 0).toFixed(2);
}

increaseQty(item: any) {
  // this.proSer.increaseQty(item)
  // console.log(item);

  this.firebaseSer.increaseQty(item)

}

decreaseQty(item: any) {
  // this.proSer.decreaseQty(item)

  this.firebaseSer.decreaseQty(item)
}

removeItem(item: any) {
  // this.proSer.removePro(item)
   this.firebaseSer.deleteProCart(item)
}


}