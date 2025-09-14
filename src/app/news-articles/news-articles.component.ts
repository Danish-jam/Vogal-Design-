import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../Services/partner.service';

@Component({
  selector: 'app-news-articles',
  templateUrl: './news-articles.component.html',
  styleUrls: ['./news-articles.component.css'],

})
export class NewsArticlesComponent implements OnInit{
  newsArticles : any[] = []
  constructor(private logoSer : PartnerService){

  }

  ngOnInit(): void {
     this.logoSer.getNewsArticle().subscribe((res) =>{
        this.newsArticles = res.filter( val => val.showHomePage == "true")
     })
  }
}
