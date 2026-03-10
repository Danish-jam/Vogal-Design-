import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProListComponent } from './proList/proList.component';
import { ProHighlightsComponent } from './proHighlights/proHighlights.component';
import { ProductInfoComponent } from './productInfo/productInfo.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  // ===== Home =====
  { path: '', component: HomeComponent },           // Default route
  { path: 'home', component: HomeComponent },

  // ===== Categories =====
  { path: 'categories', component: CategoriesComponent },        // All categories
  { path: 'categories/:category', component: CategoriesComponent }, // Specific category

  // ===== Products =====
  { path: 'allpro', component: ProListComponent },   // All products

  // ===== Cart =====
  { path: 'cart', component: CartComponent },

  // ===== Product Details =====
  { path: 'home/details/:id', component: ProductInfoComponent },
  { path: 'categories/:category/details/:id', component: ProductInfoComponent },
  { path: 'allpro/details/:id', component: ProductInfoComponent },
  { path: 'search/details/:id', component: ProductInfoComponent },

  // ===== Lazy Loaded Modules =====
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }