import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-details-pro',
  templateUrl: './ProductInfo.component.html',
  styleUrls: ['./ProductInfo.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: any
  selectedSize: string = ''
  quantity: number = 1
  selectedImage: string = ''  
  constructor(
    private route: ActivatedRoute,
    private proSer: ProductService,
    private cartSer: CartService
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    console.log(id);

    if (id) {
      this.proSer.getProductById(id).subscribe((res) => {
        this.product = res
      })
    }

  }
  decreaseQty() {

  }
  selectColor(color: string) {
    this.product.color = color;
  }
  increaseQty() { }
  selectImage(image: string) {
    this.product.image = image;
  }
  addToCart(item: string) {
    console.log(item);
    this.cartSer.addToCart(item)
  }

}
