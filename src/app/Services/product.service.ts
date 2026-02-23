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
  // ---------------- Products ----------------

  searchPro(name: string): Observable<Product[]> {
    return this.afs.collection<Product>(
      'products',
      ref => ref.where('name', '>=', name).where('name', '<=', name + '\uf8ff')
    ).valueChanges({ idField: 'id' });
  }

  getProducts(): Observable<Product[]> {
    return this.afs.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  getHomePagePro(): Observable<Product[]> {
    return this.afs.collection<Product>(
      'products',
      ref => ref.where('showOnHomePage', '==', 'true')
    ).valueChanges({ idField: 'id' });
  }

  getProductId(id: string): Observable<Product | undefined> {
    return this.afs.collection<Product>('products').doc<Product>(id).valueChanges();
  }

  getProductByName(name: string): Observable<Product[]> {
    return this.afs.collection<Product>(
      'products',
      ref => ref.where('name', '>=', name).where('name', '<=', name + '\uf8ff')
    ).valueChanges();
  }

  postProduct(newPro: Product): Observable<any> {
    const { id, ...data } = newPro;
    return from(this.afs.collection('products').add(data));
  }

  updateProduct(id: string, updatePro: Product): Observable<any> {
    return from(this.afs.collection('products').doc(id).update(updatePro));
  }

  deleteProduct(proId: string): Observable<any> {
    return from(this.afs.collection('products').doc(proId).delete());
  }

  getQuestionsByCategory(category: string): Observable<Product[]> {
    return this.afs.collection<Product>(
      'products',
      ref => ref.where('category', '==', category)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => ({ ...a.payload.doc.data(), id: a.payload.doc.id })))
    );
  }

  // ---------------- Categories ----------------

  getTopCategories(): Observable<Category[]> {
    return this.afs.collection<Category>(
      'categories',
      ref => ref.where('topCategoryPro', '==', true)
    ).valueChanges({ idField: 'id' });
  }

  getHomePageCategories(): Observable<Category[]> {
    return this.afs.collection<Category>(
      'categories',
      ref => ref.where('showOnHomePage', '==', true)
    ).valueChanges({ idField: 'id' });
  }
  getAllProductCategories(): Observable<any[]> {
    return this.afs.collection('categories').valueChanges({ idField: 'id' });
  }

  getCategories(): Observable<Category[]> {
    return this.afs.collection<Category>('categories')
      .valueChanges({ idField: 'id' });
  }

  getCatgegrProId(id: string | null): Observable<Category | undefined> {
    return this.afs.collection('categories')
      .doc<Category>(id!)
      .valueChanges({ idField: 'id' });
  }

  postCategrPro(newPro: Category): Observable<any> {
    const { id, ...data } = newPro;
    return from(this.afs.collection('categories').add(data));
  }

  deleteCategrProFromService(proId: string): Observable<any> {
    return from(this.afs.collection('categories').doc(proId).delete());
  }

  // ---------------- Discover / More Categories ----------------

  getDiscoverPro(): Observable<Category[]> {
    return this.afs.collection<Category>('discoverPro').valueChanges({ idField: 'id' });
  }

  postDiscoverPro(newPro: Category): Observable<any> {
    const { id, ...data } = newPro;
    return from(this.afs.collection('discoverPro').add(data));
  }

  deleteDiscoverProFromService(proId: string): Observable<any> {
    return from(this.afs.collection('discoverPro').doc(proId).delete());
  }

  getDiscoverProId(id: string): Observable<Category | undefined> {
    return this.afs.collection<Category>('discoverPro').doc(id).valueChanges();
  }

  updateDiscoverPro(id: string, updatePro: Category): Observable<any> {
    const { id: _id, ...data } = updatePro;
    return from(this.afs.collection('discoverPro').doc(id).update(data));
  }

  getQuestionsByShowHomePage(showHomePage: boolean): Observable<Category[]> {
    return this.afs.collection<Category>(
      'discoverPro',
      ref => ref.where('showOnHomePage', '==', showHomePage)
    ).valueChanges({ idField: 'id' });
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