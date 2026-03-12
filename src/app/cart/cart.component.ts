import { Component, OnInit } from '@angular/core';
import { FirebaseProService } from '../Services/firebase-pro.service';
import { CartService } from '../Services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  constructor(
    private firebaseSer: FirebaseProService,
    private cartSer: CartService
  ) { }

  cartItems: any[] = [];
  cartlength: any;
  spinner: boolean = false
  subtotal: number = 0;
  shipping: number = 5; // fixed shipping
  showToast: boolean = false; 
  userid: any;
  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    this.userid = userInfo.uid;

    this.cartSer.getUserCart(this.userid).subscribe(res => {
      this.cartItems = res.items;
      this.cartlength = res.length;
      this.calculateTotal();
    });


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

    this.cartSer.increaseQty(item)

  }

  decreaseQty(item: any) {
    // this.proSer.decreaseQty(item)

    this.cartSer.decreaseQty(item)
  }

  removeItem(item: any) {
    this.cartSer.deleteProCart(item)
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }


  calculateTotal() {
    this.subtotal = this.cartItems.reduce((total: number, item: any) => {
      return total + (item.price * item.qty);
    }, 0);
  }


}