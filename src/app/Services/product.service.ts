import { Injectable } from '@angular/core';
import { PopularCategories as Category } from '../models/PopularCategories.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authSer: AuthService) { }

  private apiUrl: string = 'http://localhost:3200/'

  searchPro(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}products?q=${name}`);
  }

  getTopCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + `categories?topCategoryPro=true`)
  }
  getHomePageCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + `categories?showOnHom~ePage=true`)
  }

  postCategrPro(newPro: Category): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}categories`, newPro)
  }

  deleteCategrProFromService(proId: number): Observable<Category[]> {
    return this.http.delete<Category[]>(`${this.apiUrl}categories/${proId}`)
  }

  getCatgegrProId(id: string | null): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}categories/${id}`)
  }

  updateCategrPro(Id: number, updatePro: Category) {
    return this.http.put<Category>(`${this.apiUrl}categories/${Id}`, updatePro);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'categories')
  }





  updateCart(cartId: number, updatedCart: any): Observable<any> {
    return this.http.put(`${this.apiUrl}cart/${cartId}`, updatedCart);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'products')
  }

  getHomePagePro(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + `products?showOnHomePage=true`)
  }
  getAllProductCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}categories`);
  }

  postProduct(newPro: Product): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}products`, newPro)
  }

  deleteProduct(proId: number): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.apiUrl}products/${proId}`)
  }

  getProductId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${id}`)
  }

  getProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products?q=${name}`);
  }

  updateProduct(Id: number, updatePro: Product) {
    return this.http.put<Product>(`${this.apiUrl}products/${Id}`, updatePro);
  }

  getQuestionsByCategory(category: string) {
    return this.http.get(`${this.apiUrl}products?category=${category}`);
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

  deleteProFromCart(proId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(`${this.apiUrl}cart/${proId}`)
  }

  deleteCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}cart/${cartId}`);
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




// "discoverPro": [
//   {
//     "id": "0",
//     "img": "https://vogal-demo.myshopify.com/cdn/shop/files/women_afd8981d-2850-4ad1-8dea-d2ba8504ad48.jpg?v=1676805182",
//     "showHomePage": "true",
//     "btnText": "WOMEN"
//   },
//   {
//     "id": "1",
//     "img": "https://vogal-demo.myshopify.com/cdn/shop/files/gb2.jpg?v=1679727970",
//     "showHomePage": "true",
//     "btnText": "MEN"
//   },
//   {
//     "id": "0",
//     "img": "https://vogal-demo.myshopify.com/cdn/shop/files/shoes2_43fa6f2b-36e4-4161-a05b-0fe26f1ffe62.jpg?v=1676806657",
//     "showHomePage": "true",
//     "btnText": "SHOES"
//   },
//   {
//     "id": "1",
//     "img": "https://vogal-demo.myshopify.com/cdn/shop/files/gb3.jpg?v=1676727621",
//     "showHomePage": "true",
//     "btnText": "LAPTOP"
//   },
//   {
//     "id": "0",
//     "img": "https://vogal-demo.myshopify.com/cdn/shop/files/women_afd8981d-2850-4ad1-8dea-d2ba8504ad48.jpg?v=1676805182",
//     "showHomePage": "true",
//     "btnText": "WOMEN"
//   },
//   {
//     "id": "1",
//     "img": "https://vogal-demo.myshopify.com/cdn/shop/files/gb2.jpg?v=1679727970",
//     "showHomePage": "true",
//     "btnText": "MEN"
//   }
// ],