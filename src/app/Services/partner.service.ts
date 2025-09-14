import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Partner } from '../models/partner.model';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {


  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:3200/'

  getPartner(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl + 'partner' )
  }

  getHomePagePartner(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl + `partner?showHomePge=true`)
  }

  postPartner(newlogo: Partner): Observable<Partner[]> {
    return this.http.post<Partner[]>(`${this.apiUrl}partner`, newlogo)
  }

  deletePartner(proId: number): Observable<Partner[]> {
    return this.http.delete<Partner[]>(`${this.apiUrl}partner/${proId}`)
  }

  getPartnerId(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}partner/${id}`)
  }

  updatePartner(Id: number, updatePro: Partner) {
    return this.http.put<Partner>(`${this.apiUrl}partner/${Id}`, updatePro);
  }



  getNewsArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl + 'ArticleVault')
  }

  postNewsArticle(newArticle: Article): Observable<Article[]> {
    return this.http.post<Article[]>(`${this.apiUrl}ArticleVault`, newArticle)
  }

  deleteNewsArticle(proId: number): Observable<Article[]> {
    return this.http.delete<Article[]>(`${this.apiUrl}ArticleVault/${proId}`)
  }

  getNewsArticleId(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}ArticleVault/${id}`)
  }

  updateNewsArticle(Id: number, updatePro: Article) {
    return this.http.put<Article>(`${this.apiUrl}ArticleVault/${Id}`, updatePro);
  }
}
