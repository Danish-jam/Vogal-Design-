import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseProService } from '../Services/firebase-pro.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  selectedIndex: number = 0;
  categories: any
  selectedCategory: any
  constructor(
    private proSer: ProductService,
    private route: ActivatedRoute,
    private firebaseSer: FirebaseProService
  ) {

  }
  products: any
  routeCategory: any
  allProducts: any[] = []
  showToast: boolean = false
  ngOnInit(): void {
    // this.proSer.getProducts().subscribe((res) => {
    //   this.allProducts = res;
    //   this.categories = [...Array.from(new Set(res.map(item => item.category)))];
    this.proSer.getAllProductCategories().subscribe((res) => {
      this.categories = res;

      this.route.paramMap.subscribe(params => {
        this.selectedCategory = params.get('category');

        if (this.selectedCategory) {
          this.getProByCategories(this.selectedCategory);

          // active index set
          this.selectedIndex = this.categories.findIndex(
            (c: any) => c.name === this.selectedCategory
          );
        }
      });

    });
  }


  getProByCategories(catgrName: any) {
    console.log(catgrName);
    this.proSer.getQuestionsByCategory(catgrName).subscribe((res) => {
      this.products = res
      console.log(res);
    })
  }

  addtoCart(pro: any) {
    this.firebaseSer.addToProFirebaseCart(pro)
    this.showToast = true;

    // 3. Hide toast after 3 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 2000)
  }

}
