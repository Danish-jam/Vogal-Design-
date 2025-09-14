import { Injectable } from '@angular/core';
import { NavigationLink } from '../models/navlink.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarouselData } from '../models/carousel.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarCarouselService {

  constructor(private http: HttpClient) { }

  // json-server --watch db.json --port 3200


  private apiUrl: string = 'http://localhost:3200/'



  getNavLinkGroup(): Observable<NavigationLink[]> {
    return this.http.get<NavigationLink[]>(this.apiUrl + 'navbar')
  }

  postNavLinkGroup(newLink: NavigationLink): Observable<NavigationLink[]> {
    return this.http.post<NavigationLink[]>(`${this.apiUrl}navbar`, newLink)
  }

  deleteNavLinkGroup(LinkId: number): Observable<NavigationLink[]> {
    return this.http.delete<NavigationLink[]>(`${this.apiUrl}navbar/${LinkId}`)
  }

  getNavLinkGroupId(id: number): Observable<NavigationLink> {
    return this.http.get<NavigationLink>(`${this.apiUrl}navbar/${id}`)
  }

 updateNavLinkGroup(Id: number, updatelink: NavigationLink) {
  return this.http.put<NavigationLink>(`${this.apiUrl}navbar/${Id}`,updatelink);
}



  getCarouselData(): Observable<CarouselData[]> {
    return this.http.get<CarouselData[]>(this.apiUrl + 'carouselData')
  }

  postCarouselData(newCarsouleData: CarouselData): Observable<CarouselData[]> {
    return this.http.post<CarouselData[]>(`${this.apiUrl}carouselData`, newCarsouleData)
  }

  deleteCarouselData(carouselId: number): Observable<CarouselData[]> {
    return this.http.delete<CarouselData[]>(`${this.apiUrl}carouselData/${carouselId}`)
  }

  getCarouselDataId(id: number): Observable<CarouselData> {
    return this.http.get<CarouselData>(`${this.apiUrl}carouselData/${id}`)
  }

 updateCarouselData(Id: number, updateCarouselData: CarouselData) {
  return this.http.put<CarouselData>(`${this.apiUrl}carouselData/${Id}`, updateCarouselData);
}


}
