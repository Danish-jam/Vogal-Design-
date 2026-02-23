import { Injectable } from '@angular/core';
import { NavigationLink } from '../models/navlink.model';
import { CarouselData } from '../models/carousel.model';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NavbarCarouselService {

  constructor(private afs: AngularFirestore) { }

  // ---------------- NAVBAR ----------------

  getNavLinkGroup(): Observable<NavigationLink[]> {
    return this.afs.collection<NavigationLink>('navbar').valueChanges({ idField: 'id' });
  }

  getNavLinkGroupId(id: string): Observable<NavigationLink | undefined> {
    return this.afs.collection<NavigationLink>('navbar').doc(id).valueChanges();
  }

  postNavLinkGroup(newLink: NavigationLink): Observable<any> {
    const { id, ...data } = newLink;
    return from(this.afs.collection('navbar').doc(id).set(data));
  }

  updateNavLinkGroup(id: string, updatedLink: NavigationLink): Observable<any> {
    const { id: _id, ...data } = updatedLink;
    return from(this.afs.collection('navbar').doc(id).update(data));
  }

  deleteNavLinkGroup(id: string): Observable<any> {
    return from(this.afs.collection('navbar').doc(id).delete());
  }

  // ---------------- CAROUSEL ----------------

  getCarouselData(): Observable<CarouselData[]> {
    return this.afs.collection<CarouselData>('carouselData').valueChanges({ idField: 'id' });
  }

  getCarouselDataId(id: string): Observable<CarouselData | undefined> {
    return this.afs.collection<CarouselData>('carouselData').doc(id).valueChanges();
  }

  postCarouselData(newCarousel: CarouselData): Observable<any> {
    const { id, ...data } = newCarousel;
    return from(this.afs.collection('carouselData').doc(id).set(data));
  }

  updateCarouselData(id: string, updatedCarousel: CarouselData): Observable<any> {
    const { id: _id, ...data } = updatedCarousel;
    return from(this.afs.collection('carouselData').doc(id).update(data));
  }

  deleteCarouselData(id: string): Observable<any> {
    return from(this.afs.collection('carouselData').doc(id).delete());
  }
}