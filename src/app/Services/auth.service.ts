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
    private router: Router
  ) { }


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

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        window.location.href = '/home';
      })
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
          await this.firestore.collection('users').doc(userId).set({
            uid: userId,
            fname: fname,
            lname: lname,
            email: email,
          });
         window.location.href = `/user/login?id=${userId}`;
        }
      })
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

  getUsersFormFirebase() {
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
    return JSON.parse(localStorage.getItem("user") || '[]')
  }






}
