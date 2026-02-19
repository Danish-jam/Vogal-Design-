import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProService {

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authSer: AuthService
  ) { }


  addToProFirebaseCart(pro: any) {

    pro.qty = pro.qty ?? 1

    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid

    let newPro = {
      img: pro.img,
      name: pro.name,
      price: pro.price,
      id: pro.id,
      category: pro.category,
      qty: pro.qty
    }


    this.firestore.collection('cart').doc(userid).get().subscribe((res: any) => {
      console.log(res);
      if (res.exists) {
        const cartPro = res.data()?.items ?? [];
        const findPro = cartPro.find((pro: any) => pro.id == newPro.id);
        if (findPro) {
          findPro.qty++
          this.firestore.collection('cart').doc(userid).update({
            items: cartPro
          });
        } else {
          cartPro.push(newPro)
          this.firestore.collection('cart').doc(userid).update({
            items: cartPro
          });
        }
      } else {
        const userCart = {
          userId: userid,
          items: [newPro]
        }
        this.firestore.collection('cart').doc(userid).set(userCart)
      }

    })

  }



  increaseQty(item: Product) {
    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid
    this.firestore.collection('cart').doc(userid).get().subscribe((res: any) => {
      const cartPro = res.data()?.items ?? [];
      const findPro = cartPro.find((pro: Product) => pro.id == item.id);
      if (findPro) {
        findPro.qty++
        this.firestore.collection('cart').doc(userid).update({
          items: cartPro
        });
      }
    })
  }




  decreaseQty(item: Product) {
    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid
    this.firestore.collection('cart').doc(userid).get().subscribe((res: any) => {
      const cartPro = res.data()?.items ?? [];
      const findPro = cartPro.find((pro: Product) => pro.id == item.id);
      if (findPro) {
        if (findPro.qty <= 1) {
          findPro.qty = 1
        } else {
          findPro.qty--
          this.firestore.collection('cart').doc(userid).update({
            items: cartPro
          });
        }

      }
    })
  }



  deleteProCart(item: Product) {
    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid
    this.firestore.collection('cart').doc(userid).get().subscribe((res: any) => {
      const cartPro = res.data()?.items ?? [];
      const updataCart = cartPro.filter((pro: Product) => pro.id !== item.id);
      this.firestore.collection('cart').doc(userid).update({
        items: updataCart
      });
    })
  }

  getUserById(id: string): Observable<any> {
    return this.firestore.collection('users').doc(id).valueChanges();
  }


  }
