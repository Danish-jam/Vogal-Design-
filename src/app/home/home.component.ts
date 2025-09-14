import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { PopularCategories } from '../models/PopularCategories.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allCategories: any
  firstCatgr!: PopularCategories[] 
  lastCatgr!: PopularCategories[]
  constructor(
    private proSer: ProductService
  ) {

  }

  ngOnInit(): void {
    this.proSer.getTopCategories().subscribe((res) => {
      this.firstCatgr = res
    })

    this.proSer.getHomePageCategories().subscribe((res)=>{
      this.lastCatgr = res
    })
  }

}
