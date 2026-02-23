import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {

    return this.afAuth.authState.pipe(
      map(user => {

        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        this.firestore.collection('users').doc(user.uid)
          .valueChanges()
          .subscribe((data: any) => {

            if (data?.role !== 'admin') {
              this.router.navigate(['/']);
            }

          });

        return true;

      })
    );
  }
}