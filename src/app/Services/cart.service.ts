import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';
import { Cart } from '../models/cart.model';
import { from, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private afs: AngularFirestore, private authSer: AuthService) { }

  // 🔹 Update cart
  updateCart(cartId: string, updatedCart: any): Observable<any> {
    const { id, ...data } = updatedCart;
    return from(this.afs.collection('cart').doc(cartId).update(data));
  }

  // 🔹 Get all carts
  getAllCarts(): Observable<Cart[]> {
    return this.afs.collection<Cart>('cart').valueChanges({ idField: 'id' });
  }

  // 🔹 Get cart by user ID
  getCartByUserId(userId: number): Observable<any> {
    return this.afs.collection<Cart>('cart', ref => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  // 🔹 Get cart by cart ID
  getCartById(cartId: string): Observable<Cart | undefined> {
    return this.afs.collection<Cart>('cart').doc(cartId).valueChanges();
  }

  // 🔹 Add product to a new cart
  addNewCart(newCart: any): Observable<any> {
    return from(this.afs.collection('cart').add(newCart));
  }

  // 🔹 Delete a cart
  deleteCart(cartId: string): Observable<any> {
    return from(this.afs.collection('cart').doc(cartId).delete());
  }

  deleteProFromCart(userId: string, productId: string) {

    const docRef = this.afs.collection('cart').doc(userId);

    docRef.valueChanges().subscribe((data: any) => {

      if (!data || !data.items) return;

      const updatedItems = data.items.filter(
        (item: any) => item.id !== productId
      );

      docRef.update({ items: updatedItems });

    });
  }

  // cart.service.ts
  clearUserCart(userId: string) {
    return this.afs.collection('cart').doc(userId).update({
      items: [] // empty array
    });
  }


  getUserCart(userId: string): Observable<{ items: any[]; length: number }> {
    return this.afs
      .collection('cart')
      .doc<{ items: any[] }>(userId)
      .valueChanges()
      .pipe(
        map(doc => ({
          items: doc?.items || [],
          length: doc?.items?.length || 0
        }))
      );
  }


  getAllProductCategories(): Observable<any[]> {
    return this.afs.collection('categories').valueChanges({ idField: 'id' });
  }



  // ---------------- Cart Operations ----------------
  addToCart(pro: any) {

    pro.qty = pro.qty ?? 1

    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo?.uid

    let newPro = {
      img: pro?.img || '',
      name: pro?.name || '',
      price: pro?.price || 0,
      id: pro?.id || '',
      category: pro?.category || '',
      qty: pro?.qty || 1
    }

    this.afs.collection('cart').doc(userid).get().subscribe((res: any) => {

      if (res.exists) {
        const cartPro = res.data()?.items ?? []
        const findPro = cartPro.find((p: any) => p.id == newPro.id)

        if (findPro) {
          findPro.qty++

          this.afs.collection('cart').doc(userid).update({
            items: cartPro
          })

        } else {

          cartPro.push(newPro)

          this.afs.collection('cart').doc(userid).update({
            items: cartPro
          })
        }

      } else {

        const userCart = {
          userId: userid,
          items: [newPro]
        }

        this.afs.collection('cart').doc(userid).set(userCart)

      }

    })

  }


  // addToCart(pro: any) {
  //   pro.qty = pro.qty ?? 1;
  //   const userInfo = this.authSer.getCurrentUser();
  //   const userid = userInfo.id;

  //   const newPro = {
  //     img: pro.img,
  //     name: pro.name,
  //     price: pro.price,
  //     id: pro.id,
  //     category: pro.category,
  //     qty: pro.qty
  //   };

  //   this.getCartByUserId(userid).subscribe(res => {
  //     let cartPro = res.find((val: any) => val.userId == userid);
  //     if (cartPro) {
  //       const findPro = cartPro.items.find((p: any) => p.id == newPro.id);
  //       if (findPro) {
  //         findPro.qty++;
  //       } else {
  //         cartPro.items.push(newPro);
  //       }
  //       this.updateCart(cartPro.id, cartPro).subscribe();
  //     } else {
  //       const userCart = { userId: userid, items: [newPro] };
  //       this.addNewCart(userCart).subscribe();
  //     }
  //   });
  // }


  increaseQty(item: Product) {
    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid
    this.afs.collection('cart').doc(userid).get().subscribe((res: any) => {
      const cartPro = res.data()?.items ?? [];
      const findPro = cartPro.find((pro: Product) => pro.id == item.id);
      if (findPro) {
        findPro.qty++
        this.afs.collection('cart').doc(userid).update({
          items: cartPro
        });
      }
    })
  }




  decreaseQty(item: Product) {
    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid
    this.afs.collection('cart').doc(userid).get().subscribe((res: any) => {
      const cartPro = res.data()?.items ?? [];
      const findPro = cartPro.find((pro: Product) => pro.id == item.id);
      if (findPro) {
        if (findPro.qty <= 1) {
          findPro.qty = 1
        } else {
          findPro.qty--
          this.afs.collection('cart').doc(userid).update({
            items: cartPro
          });
        }

      }
    })
  }



  deleteProCart(item: Product) {
    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid
    this.afs.collection('cart').doc(userid).get().subscribe((res: any) => {
      const cartPro = res.data()?.items ?? [];
      const updataCart = cartPro.filter((pro: Product) => pro.id !== item.id);
      this.afs.collection('cart').doc(userid).update({
        items: updataCart
      });
    })
  }
}
