import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountModel } from '../models/AccountModel.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  private api = 'http://localhost:3200/users';
  private apiUrl: string = 'http://localhost:3200/'


  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.api}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          return users[0];
        }
        throw new Error('Invalid credentials');
      })
    );
  }

 getUserEmail(email : string): Observable<AccountModel>{
    return this.http.get<any>(`${this.api}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          return users[0];
        }
        console.log('Invalid credentials');
      })
    );
    }



  postUser(newUser: AccountModel): Observable<AccountModel[]> {
    return this.http.post<AccountModel[]>(`${this.apiUrl}users`, newUser)
  }

  deleteUser(userId: number): Observable<AccountModel[]> {
    return this.http.delete<AccountModel[]>(`${this.apiUrl}users/${userId}`)
  }

  getUsers(): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(this.apiUrl + 'users')
  }

  signup(user: any): Observable<any> {
    return this.http.post(this.api, user);
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || '[]')
  }






}
