import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Partner } from '../models/partner.model';
import { Article } from '../models/article.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {


  constructor(private http: HttpClient, private afs: AngularFirestore,) { }

  private apiUrl: string = 'http://localhost:3200/'
  postPartner(partnerData: Partner) {
    // Generate a random ID
    const id = this.afs.createId();

    // Merge partnerData safely
    const dataWithId = { ...partnerData, id }; // id last, overwrites only if needed

    // Save to Firestore
    this.afs.collection('partners').doc(id).set(dataWithId)
      .then(() => {
        console.log('Partner added successfully with ID:', id);
      })
      .catch((error) => {
        console.error('Error adding partner:', error);
      });
  }

  updatePartner(id: string, partnerData: Partner) {
    this.afs.collection('partners').doc(id).update(partnerData)
      .then(() => {
        console.log('Partner updated successfully!');
      })
      .catch(err => console.error('Error updating partner:', err));
  }

  getPartner(): Observable<Partner[]> {
    return this.afs.collection<Partner>('partners').valueChanges({ idField: 'id' });
  }

  getHomePagePartner(): Observable<Partner[]> {
    return this.afs.collection<Partner>(
      'partners',
      ref => ref.where('showHomePge', '==', 'true')
    ).valueChanges({ idField: 'id' });
  }

  getPartnerId(id: string): Observable<Partner | undefined> {
    return this.afs.collection<Partner>('partners').doc<Partner>(id).valueChanges();
  }

  deletePartner(id: string) {
    this.afs.collection('partners').doc(id).delete()
      .then(() => {
        console.log('Partner deleted successfully!');
      })
      .catch(err => console.error('Error deleting partner:', err));
  }
  // getPartner(): Observable<Partner[]> {
  //   return this.http.get<Partner[]>(this.apiUrl + 'partner' )
  // }

  // getHomePagePartner(): Observable<Partner[]> {
  //   return this.http.get<Partner[]>(this.apiUrl + `partner?showHomePge=true`)
  // }

  // postPartner(newlogo: Partner): Observable<Partner[]> {
  //   return this.http.post<Partner[]>(`${this.apiUrl}partner`, newlogo)
  // }

  // deletePartner(proId: number): Observable<Partner[]> {
  //   return this.http.delete<Partner[]>(`${this.apiUrl}partner/${proId}`)
  // }

  // getPartnerId(id: number): Observable<Partner> {
  //   return this.http.get<Partner>(`${this.apiUrl}partner/${id}`)
  // }

  // updatePartner(Id: number, updatePro: Partner) {
  //   return this.http.put<Partner>(`${this.apiUrl}partner/${Id}`, updatePro);
  // }


  getNewsArticle(): Observable<Article[]> {
    return this.afs.collection<Article>('ArticleVault').valueChanges({ idField: 'id' });
  }

  postNewsArticle(newArticle: Article) {
    const id = this.afs.createId();
    const dataWithId = { ...newArticle, id };

    this.afs.collection('ArticleVault').doc(id).set(dataWithId)
      .then(() => {
        console.log('Article added successfully with ID:', id);
      })
      .catch((error) => {
        console.error('Error adding article:', error);
      });
  }

  deleteNewsArticle(id: string) {
    this.afs.collection('ArticleVault').doc(id).delete()
      .then(() => {
        console.log('Article deleted successfully!');
      })
      .catch(err => console.error('Error deleting article:', err));
  }

  getNewsArticleId(id: string): Observable<Article | undefined> {
    return this.afs.collection<Article>('ArticleVault').doc<Article>(id).valueChanges();
  }

  updateNewsArticle(Id: string, updatePro: Article) {
    this.afs.collection('ArticleVault').doc(Id).update(updatePro)
      .then(() => {
        console.log('Article updated successfully!');
      })
      .catch(err => console.error('Error updating article:', err));
  }

  // getNewsArticle(): Observable<Article[]> {
  //   return this.http.get<Article[]>(this.apiUrl + 'ArticleVault')
  // }

  // postNewsArticle(newArticle: Article): Observable<Article[]> {
  //   return this.http.post<Article[]>(`${this.apiUrl}ArticleVault`, newArticle)
  // }

  // deleteNewsArticle(proId: number): Observable<Article[]> {
  //   return this.http.delete<Article[]>(`${this.apiUrl}ArticleVault/${proId}`)
  // }

  // getNewsArticleId(id: number): Observable<Article> {
  //   return this.http.get<Article>(`${this.apiUrl}ArticleVault/${id}`)
  // }

  // updateNewsArticle(Id: number, updatePro: Article) {
  //   return this.http.put<Article>(`${this.apiUrl}ArticleVault/${Id}`, updatePro);
  // }
}
