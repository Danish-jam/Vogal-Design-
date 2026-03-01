import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProHighlightsComponent } from './proHighlights/proHighlights.component';
import { ProductInfoComponent } from './productInfo/productInfo.component';
import { ProListComponent } from './proList/proList.component';
import { CategoriesComponent } from './categories/categories.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "categories/:category",
    component: CategoriesComponent
  },
  {
    path: "allpro",
    component: ProListComponent
  },
  {
    path: "cart",
    component: CartComponent
  }, {
    path: "categories/New Arrivals",
    component: CategoriesComponent
  },
  {
    path: "home/detaile/:id",
    component: ProductInfoComponent
  },
  // path: "product-deatail/:id",
  {
    path: 'categories/detaile/:id',
    component: ProductInfoComponent
  },
  {
    path: 'allpro/detaile/:id',
    component: ProductInfoComponent
  },
  {
    path: "admin", loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule)
  },
  {
    path: "user", loadChildren: () => import("./user/user.module").then(mod => mod.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
