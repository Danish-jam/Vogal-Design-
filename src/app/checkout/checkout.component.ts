import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal: number = 0;
  deliveryType: string = 'delivery';
  cartItems: any[] = [];
  cartlength: number = 0;
  checkoutForm!: FormGroup;
  showToast: boolean = false;
  constructor(private cartSer: CartService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      city: [''],
      address: ['']
    });

    const userInfo = this.authService.getCurrentUser()
    const userid = userInfo.uid;

    this.cartSer.getUserCart(userid).subscribe(res => {
      this.cartItems = res.items;
      this.calculateTotal();
    });
  }

  selectDelivery(type: string) {
    this.deliveryType = type;

    if (type === 'delivery') {
      this.checkoutForm.get('city')?.setValidators([Validators.required]);
      this.checkoutForm.get('address')?.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      this.checkoutForm.get('city')?.clearValidators();
      this.checkoutForm.get('address')?.clearValidators();
      this.checkoutForm.get('city')?.setValue('');
      this.checkoutForm.get('address')?.setValue('');
    }

    this.checkoutForm.get('city')?.updateValueAndValidity();
    this.checkoutForm.get('address')?.updateValueAndValidity();
  }

  removeItem(item: any) {
    this.cartSer.deleteProCart(item)
  }


  calculateTotal() {
    this.subtotal = this.cartItems.reduce((total: number, item: any) => {
      return total + (item.price * item.qty);
    }, 0);
  }


  placeOrder() {
    if (this.checkoutForm.invalid) return;

    const formValue = this.checkoutForm.value;
    const userId = this.authService.getCurrentUser().uid;

    const orderData: any = {
      userId: userId,
      fullName: formValue.fullName,
      email: formValue.email,
      phone: formValue.phone,
      deliveryType: this.deliveryType,
      items: this.cartItems,
      totalAmount: this.subtotal + (this.deliveryType === 'delivery' ? 5 : 0)
    };

    if (this.deliveryType === 'delivery') {
      orderData.city = formValue.city;
      orderData.address = formValue.address;
    }

    // Save order to Firebase
    this.authService.saveOrderToFirebase(orderData)
      .then(() => {
        // Clear cart from backend
        this.cartSer.clearUserCart(userId).then(() => {
          // Clear local cart and recalc total
          this.cartItems = [];
          this.calculateTotal();
          // Reset form
          this.checkoutForm.reset();
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        });
      })
  }
}
