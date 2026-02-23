import { Injectable } from '@angular/core';
import { PopularCategories as Category } from '../models/PopularCategories.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, from } from 'rxjs';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authSer: AuthService, private afs: AngularFirestore) { }

  private apiUrl: string = 'http://localhost:3200/'

  searchPro(name: string): Observable<Product[]> {
    return this.afs.collection<Product>('products', ref => ref.where('name', '>=', name).where('name', '<=', name + '\uf8ff')).valueChanges();
  }


  // 🔹 Get Top Categories
  getTopCategories(): Observable<Category[]> {
    return this.afs.collection<Category>(
      'categories',
      ref => ref.where('topCategoryPro', '==', true)
    ).valueChanges({ idField: 'id' });
  }

  // 🔹 Get Home Page Categories
  getHomePageCategories(): Observable<Category[]> {
    return this.afs.collection<Category>(
      'categories',
      ref => ref.where('showOnHomePage', '==', true)
    ).valueChanges({ idField: 'id' });
  }

  // 🔹 Add Category
  postCategrPro(newPro: Category): Observable<any> {
    const { id, ...data } = newPro;
    return from(this.afs.collection('categories').add(data));
  }

  // 🔹 Delete Category
  deleteCategrProFromService(proId: string): Observable<any> {
    return from(this.afs.collection('categories').doc(proId).delete());
  }

  // 🔹 Get Category By ID
  getCatgegrProId(id: string | null): Observable<Category | undefined> {
    return this.afs.collection('categories')
      .doc<Category>(id!)
      .valueChanges({ idField: 'id' });
  }

  // // 🔹 Update Category
  // updateCategrPro(id: string, updatePro: Category): Observable<any> {
  //   const { id: _, ...data } = updatePro;
  //   return from(this.afs.collection('categories').doc(id).update(data));
  // }

  // 🔹 Get All Categories
  getCategories(): Observable<Category[]> {
    return this.afs.collection<Category>('categories')
      .valueChanges({ idField: 'id' });
  }





  updateCart(cartId: string, updatedCart: any): Observable<any> {
    const { id, ...data } = updatedCart;
    return from(this.afs.collection('cart').doc(cartId).update(data));
  }
  getProducts(): Observable<Product[]> {
    return this.afs.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  getHomePagePro(): Observable<Product[]> {
    return this.afs.collection<Product>('products', ref => ref.where('showOnHomePage', '==', 'true')).valueChanges({ idField: 'id' });
  }
  getAllProductCategories(): Observable<any[]> {
    return this.afs.collection('categories')
      .valueChanges({ idField: 'id' });
  }

  postProduct(newPro: Product): Observable<any> {
    const { id, ...data } = newPro;
    return from(this.afs.collection('products').add(data));
  }

  deleteProduct(proId: string): Observable<any> {
    return from(this.afs.collection('products').doc(proId).delete());
  }

  getProductId(id: string): Observable<Product | undefined> {
    return this.afs.collection('products').doc<Product>(id).valueChanges();
  }

  getProductByName(name: string): Observable<Product[]> {
    return this.afs.collection<Product>('products', ref => ref.where('name', '>=', name).where('name', '<=', name + '\uf8ff')).valueChanges();
  }

  updateProduct(Id: string, updatePro: Product): Observable<any> {
    return from(this.afs.collection('products').doc(Id).update(updatePro));
  }

  getQuestionsByCategory(category: string): Observable<Product[]> {
    return this.afs.collection<Product>('products', ref => ref.where('category', '==', category)).snapshotChanges().pipe(
      map(actions => actions.map(a => ({ ...a.payload.doc.data(), id: a.payload.doc.id })))
    );
  }


  //CArt Products

  PostCartPro(newProduct: any): Observable<Cart[]> {
    return this.http.post<Cart[]>(`${this.apiUrl}cart`, newProduct)
  }
  // Get cart by userId
  getCartByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}cart?userId=${userId}`);
  }
  CartProducts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl + 'cart')
  }

  getCartProId(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}cart/${id}`)
  }

  deleteProFromCart(proId: string): Observable<any> {
    return from(this.afs.collection('cart').doc(proId).delete());
  }

  deleteCart(cartId: string): Observable<any> {
    return from(this.afs.collection('cart').doc(cartId).delete());
  }



  // Discover-More-Catgr

  getDiscoverPro(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'discoverPro')
  }

  postDiscoverPro(newPro: Category): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}discoverPro`, newPro)
  }

  deleteDiscoverProFromService(proId: number): Observable<Category[]> {
    return this.http.delete<Category[]>(`${this.apiUrl}discoverPro/${proId}`)
  }

  getDiscoverProId(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}discoverPro/${id}`)
  }

  updateDiscoverPro(Id: number, updatePro: Category) {
    return this.http.put<Category>(`${this.apiUrl}discoverPro/${Id}`, updatePro);
  }

  getQuestionsByShowHomePage(showHomePage: boolean): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}discoverPro?showHomePage=${showHomePage}`);
  }



  addToCart(pro: any) {
    pro.qty = pro.qty ?? 1

    const userInfo = JSON.parse(localStorage.getItem("user") || '[]')
    const userid = userInfo.id

    let newPro = {
      img: pro.img,
      name: pro.name,
      price: pro.price,
      id: pro.id,
      category: pro.category,
      qty: pro.qty
    }

    console.log(userid);

    let cartPro: any

    this.getCartByUserId(userid).subscribe((res) => {

      cartPro = res.find((val: { userId: any; }) => val.userId == userid)
      console.log(res);
      if (cartPro) {
        const cartPro = res.find((val: { userId: number }) => val.userId == userInfo.id)
        let findPro = cartPro.items.find((pro: { id: any; }) => pro.id == newPro.id)
        if (findPro) {
          console.log(findPro);
          findPro.qty++
          this.updateCart(cartPro.id, cartPro).subscribe((res) => {
            console.log(res);
            // this.calculateTotal(cartPro)
          })
        } else {
          cartPro.items.push(newPro)
          this.updateCart(cartPro.id, cartPro).subscribe((res) => {
            res
            // this.calculateTotal(cartPro)
          })
        }
      } else {
        const userCart = {
          userId: userid,
          items: [newPro]
        }
        this.PostCartPro(userCart).subscribe((res) => {
          res
        })
      }

    })
  }


  removePro(item: any) {
    let userInfo = this.authSer.getCurrentUser()
    this.getCartByUserId(userInfo.id).subscribe((res) => {
      const cartPro = res.find((val: { userId: number }) => val.userId == userInfo.id)
      console.log(cartPro);

      let findPro = cartPro.items.filter((pro: any) => pro.id != item.id)
      const updatedCart = {
        ...cartPro,
        items: findPro
      };
      console.log(updatedCart);
      this.updateCart(cartPro.id, updatedCart).subscribe((res) => {
        console.log(res);
        window.location.reload();
      })
    })
  }

  increaseQty(pro: any) {
    let userInfo = this.authSer.getCurrentUser()
    this.getCartByUserId(userInfo.id).subscribe((res) => {
      const cartPro = res.find((val: { userId: number }) => val.userId == userInfo.id)
      let findPro = cartPro.items.find((val: { id: any; }) => val.id == pro.id)
      console.log(findPro);
      if (findPro) {
        findPro.qty++
        this.updateCart(cartPro.id, cartPro).subscribe((res) => {
          res
          window.location.reload();
          // this.calculateTotal(cartPro)
        })
      }
    })
  }

  decreaseQty(pro: any) {
    let userInfo = this.authSer.getCurrentUser()
    this.getCartByUserId(userInfo.id).subscribe((res) => {
      const cartPro = res.find((val: { userId: number }) => val.userId == userInfo.id)
      let findPro = cartPro.items.find((val: { id: any; }) => val.id == pro.id)
      if (findPro.qty == 1) {
        this.removePro(findPro)
        window.location.reload();
      }
      if (findPro) {
        findPro.qty--
        this.updateCart(cartPro.id, cartPro).subscribe((res) => {
          res
          window.location.reload();
          // this.calculateTotal(cartPro)
        })
      }
    })
  }



}

// searchPro(name: string): Observable<Category[]> {
//   return this.http.get<Category[]>(`${this.apiUrl}products?q=${name}`);
// }

// getTopCategories(): Observable<Category[]> {
//   return this.http.get<Category[]>(this.apiUrl + `categories?topCategoryPro=true`)
// }
// getHomePageCategories(): Observable<Category[]> {
//   return this.http.get<Category[]>(this.apiUrl + `categories?showOnHom~ePage=true`)
// }

// getProducts(): Observable<Product[]> {
//   return this.http.get<Product[]>(this.apiUrl + 'products')
// }

// getHomePagePro(): Observable<Category[]> {
//   return this.http.get<Category[]>(this.apiUrl + `products?showOnHomePage=true`)
// }
// getAllProductCategories(): Observable<string[]> {
//   return this.http.get<string[]>(`${this.apiUrl}categories`);
// }

// postProduct(newPro: Product): Observable<Product[]> {
//   return this.http.post<Product[]>(`${this.apiUrl}products`, newPro)
// }

// deleteProduct(proId: number): Observable<Product[]> {
//   return this.http.delete<Product[]>(`${this.apiUrl}products/${proId}`)
// }

// getProductId(id: number): Observable<Product> {
//   return this.http.get<Product>(`${this.apiUrl}products/${id}`)
// }

// getProductByName(name: string): Observable<Product[]> {
//   return this.http.get<Product[]>(`${this.apiUrl}products?q=${name}`);
// }

// updateProduct(Id: number, updatePro: Product) {
//   return this.http.put<Product>(`${this.apiUrl}products/${Id}`, updatePro);
// }

// getQuestionsByCategory(category: string) {
//   return this.http.get(`${this.apiUrl}products?category=${category}`);
// }

// getTopCategories(): Observable<Category[]> {
//   return this.http.get<Category[]>(this.apiUrl + `categories?topCategoryPro=true`)
// }
// getHomePageCategories(): Observable<Category[]> {
//   return this.http.get<Category[]>(this.apiUrl + `categories?showOnHom~ePage=true`)
// }

// postCategrPro(newPro: Category): Observable<Category[]> {
//   return this.http.post<Category[]>(`${this.apiUrl}categories`, newPro)
// }

// deleteCategrProFromService(proId: number): Observable<Category[]> {
//   return this.http.delete<Category[]>(`${this.apiUrl}categories/${proId}`)
// }

// getCatgegrProId(id: string | null): Observable<Category> {
//   return this.http.get<Category>(`${this.apiUrl}categories/${id}`)
// }

// updateCategrPro(Id: number, updatePro: Category) {
//   return this.http.put<Category>(`${this.apiUrl}categories/${Id}`, updatePro);
// }

// getCategories(): Observable<any> {
//   return this.http.get<any>(this.apiUrl + 'categories')
// }