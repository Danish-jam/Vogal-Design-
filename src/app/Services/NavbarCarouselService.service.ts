import { Injectable } from '@angular/core';
import { NavigationLink } from '../models/navlink.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CarouselData } from '../models/carousel.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarCarouselService {

  constructor(private firestore: AngularFirestore) { }



  getNavLinkGroup(): Observable<NavigationLink[]> {
    return this.firestore.collection<NavigationLink>('navbar').valueChanges({ idField: 'id' });
  }

  postNavLinkGroup(newLink: NavigationLink): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('navbar').doc(newLink.id).set(newLink)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteNavLinkGroup(LinkId: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('navbar').doc(LinkId).delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getNavLinkGroupId(id: string): Observable<NavigationLink | undefined> {
    return this.firestore.collection<NavigationLink>('navbar').doc(id).valueChanges();
  }

  updateNavLinkGroup(Id: string, updatelink: NavigationLink): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('navbar').doc(Id).update(updatelink)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }



  getCarouselData(): Observable<CarouselData[]> {
    return this.firestore.collection<CarouselData>('carouselData').valueChanges({ idField: 'id' });
  }

  postCarouselData(newCarsouleData: CarouselData): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('carouselData').doc(newCarsouleData.id).set(newCarsouleData)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteCarouselData(carouselId: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('carouselData').doc(carouselId).delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getCarouselDataId(id: string): Observable<CarouselData | undefined> {
    return this.firestore.collection<CarouselData>('carouselData').doc(id).valueChanges();
  }

  updateCarouselData(Id: string, updateCarouselData: CarouselData): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('carouselData').doc(Id).update(updateCarouselData)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


}


//   getNavLinkGroup(): Observable<NavigationLink[]> {
//     return this.http.get<NavigationLink[]>(this.apiUrl + 'navbar')
//   }

//   postNavLinkGroup(newLink: NavigationLink): Observable<NavigationLink[]> {
//     return this.http.post<NavigationLink[]>(`${this.apiUrl}navbar`, newLink)
//   }

//   deleteNavLinkGroup(LinkId: number): Observable<NavigationLink[]> {
//     return this.http.delete<NavigationLink[]>(`${this.apiUrl}navbar/${LinkId}`)
//   }

//   getNavLinkGroupId(id: number): Observable<NavigationLink> {
//     return this.http.get<NavigationLink>(`${this.apiUrl}navbar/${id}`)
//   }

//  updateNavLinkGroup(Id: number, updatelink: NavigationLink) {
//   return this.http.put<NavigationLink>(`${this.apiUrl}navbar/${Id}`,updatelink);
// }



//   getCarouselData(): Observable<CarouselData[]> {
//     return this.http.get<CarouselData[]>(this.apiUrl + 'carouselData')
//   }

//   postCarouselData(newCarsouleData: CarouselData): Observable<CarouselData[]> {
//     return this.http.post<CarouselData[]>(`${this.apiUrl}carouselData`, newCarsouleData)
//   }

//   deleteCarouselData(carouselId: number): Observable<CarouselData[]> {
//     return this.http.delete<CarouselData[]>(`${this.apiUrl}carouselData/${carouselId}`)
//   }

//   getCarouselDataId(id: number): Observable<CarouselData> {
//     return this.http.get<CarouselData>(`${this.apiUrl}carouselData/${id}`)
//   }

//  updateCarouselData(Id: number, updateCarouselData: CarouselData) {
//   return this.http.put<CarouselData>(`${this.apiUrl}carouselData/${Id}`, updateCarouselData);
// }
