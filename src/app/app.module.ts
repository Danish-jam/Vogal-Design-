import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { NavComponent } from './nav/nav.component';
import { ProListComponent } from './proList/proList.component';
import { ProductInfoComponent } from './productInfo/productInfo.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PopularCategoriesComponent } from "./popularCategories/popularCategories.component";
import { RouterModule } from '@angular/router';
import { LatestProductsComponent } from "./latestProducts/latestProducts.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ExploreMoreComponent } from './exploreMore/exploreMore.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from "./Partner/Partner.component";
import { SellerProComponent } from "./seller-pro/seller-pro.component";
import { NewsArticlesComponent } from "./news-articles/news-articles.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { FooterComponent } from "./footer/footer.component";
import { ProductCardComponent } from './product-card/product-card.component';
import { AppComponent } from './app.component';
import { CountCharPipe } from './pipes/count-char.pipe';
import { SearchProPipe } from './pipes/search-pro.pipe';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CardComponent } from './card/card.component';
import { TrendCardComponent } from './trendCard/trendCard.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/enviroment/enviroment';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavTopComponent,
    NavComponent,
    ProListComponent,
    ProductInfoComponent,
    CategoriesComponent,
    CartComponent,
    CarouselComponent,
    ProductCardComponent,
    PopularCategoriesComponent,
    LatestProductsComponent,
    ExploreMoreComponent,
    TrendCardComponent,
    PartnerComponent,
    SellerProComponent,
    NewsArticlesComponent,
    FooterComponent,
    DeliveryComponent,
    CardComponent,
    CountCharPipe,
    SearchProPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    BrowserAnimationsModule,
    CommonModule,
    AdminModule,
    UserModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }