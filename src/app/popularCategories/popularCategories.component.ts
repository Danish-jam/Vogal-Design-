import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { CartService } from '../Services/cart.service';


@Component({
  selector: 'app-PopularCategories',
  templateUrl: './popularCategories.component.html',
  styleUrls: ['./popularCategories.component.css'],

})
export class PopularCategoriesComponent implements OnInit {

  @Input() topCatgrPro: any

  constructor(private proSer: ProductService ,private cartSer: CartService) {

  }


  ngOnInit(): void {
    this.proSer.getAllProductCategories().subscribe((res) => {
      console.log(res);
      this.topCatgrPro = res.slice(0, 5)
      
    })

  }



  // [
  //   {
  //     img: 'https://vogal-demo.myshopify.com/cdn/shop/files/sb2_560x.jpg?v=1676711299',
  //     heading: 'Bold Moves Exclusive',
  //     btntext: 'Discover More'
  //   },
  //   {
  //     img: 'https://vogal-demo.myshopify.com/cdn/shop/files/SB3_560x.jpg?v=1676711940',
  //     heading: 'Online Exclusive',
  //     btntext: 'Discover More'
  //   },
  //   {
  //     img: 'https://vogal-demo.myshopify.com/cdn/shop/files/SB1_560x.jpg?v=1679727714',
  //     heading: 'Online Exclusive',
  //      btntext : 'Discover More'
  //   }
  // ]

}
