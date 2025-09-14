import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  selectedIndex: number = 0;
  categories: any
  selectedCategory: any = "Exclusive Picks"
  constructor(
    private proSer: ProductService,
    private route: ActivatedRoute

  ) {

  }
  products: any
  routeCategory: any
  allProducts: any[] = []
  ngOnInit(): void {
    // this.proSer.getProducts().subscribe((res) => {
    //   this.allProducts = res;
    //   this.categories = [...Array.from(new Set(res.map(item => item.category)))];
    //   this.route.paramMap.subscribe(params => {
    //     this.selectedCategory = params.get('category');
    //   });
    // });
    this.proSer.getAllProductCategories().subscribe((res)=>{
      console.log(res);
      
    })
    this.getProByCategories(this.selectedCategory);
  }


  getProByCategories(item: any) {
    this.proSer.getQuestionsByCategory(item).subscribe((res) => {
      this.products = res
      console.log(item);
      
    })
  }

  addtoCart(pro: any) {
    this.proSer.addToCart(pro)
  }

}
