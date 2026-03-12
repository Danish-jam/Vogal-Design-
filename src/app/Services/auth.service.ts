import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountModel } from '../models/AccountModel.model';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  // json-server --watch db.json --port 3200

  private api = 'http://localhost:3200/users';
  private apiUrl: string = 'http://localhost:3200/'


  // login(email: string, password: string): Observable<any> {
  //   return this.http.get<any[]>(`${this.api}?email=${email}&password=${password}`).pipe(
  //     map(users => {
  //       if (users.length > 0) {
  //         localStorage.setItem('user', JSON.stringify(users[0]));
  //         return users[0];
  //       }
  //       throw new Error('Invalid credentials');
  //     })
  //   );
  // }

  login(email: string, password: string): Promise<any> {
    // Just return the Firebase Promise
    return this.fireauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        return res.user; // resolve user data
      });
  }


  // getUserEmail(email: string): Observable<AccountModel> {
  //   return this.http.get<any>(`${this.api}?email=${email}`).pipe(
  //     map(users => {
  //       if (users.length > 0) {
  //         localStorage.setItem('user', JSON.stringify(users[0]));
  //         return users[0];
  //       }
  //       console.log('Invalid credentials');
  //     })
  //   );
  // }


  signup(fname: string, lname: string, email: string, password: string) {

    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(async res => {

        const userId = res.user?.uid;

        if (userId) {

          let role = 'user';
          await this.firestore.collection('users').doc(userId).set({
            uid: userId,
            fname: fname,
            lname: lname,
            email: email,
            role: role
          });
          localStorage.setItem('user', JSON.stringify(res.user));
          window.location.href = '/home';
        }
      });
  }


  postUser(newUser: AccountModel): Observable<AccountModel[]> {
    return this.http.post<AccountModel[]>(`${this.apiUrl}users`, newUser)
  }

  deleteUser(userId: number): Observable<AccountModel[]> {
    return this.http.delete<AccountModel[]>(`${this.apiUrl}users/${userId}`)
  }

  // getUsers(): Observable<AccountModel[]> {
  //   return this.http.get<AccountModel[]>(this.apiUrl + 'users')
  // }

  // signup(user: any): Observable<any> {
  //   return this.http.post(this.api, user);
  // }

  getUsers() {
    return this.firestore.collection('users').valueChanges({ idField: 'id' });
  }

  logout() {
    localStorage.removeItem('user');
  }


  // logout() {
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/login']);
  // }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || '{}')
  }

  checkUserRole(userid: any): Observable<string> {
    return this.firestore.collection('users').doc(userid).get().pipe(
      map((doc: any) => {
        const userRole = doc.data()?.role || '';
        console.log(userRole);
        return userRole;
      })
    );
  }

  saveOrderToFirebase(orderData: any) {
    return this.firestore.collection('orders').add({
      ...orderData,
      orderDate: new Date(),
      status: 'pending'
    });
  }

  getUserName(uid: string): Observable<string> {
    return this.firestore.collection('users').doc(uid).get().pipe(
      map((doc: any) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('User Name:', userData.fname);
          return userData.fname;
        }
        return 'User';
      })
    );
  }

  saveContactToFirestore(contactData: { name: string; email: string; message: string }) {
    return this.firestore.collection('contactus').add({
      ...contactData,
      createdAt: new Date(),  // timestamp
      status: 'new'           // optional status
    });
  }
}

