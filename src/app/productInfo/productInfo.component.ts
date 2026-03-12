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
  cartItems: any = {};
  showQty: boolean = false;
  showQtySelector: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private proSer: ProductService,
    private cartSer: CartService
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    const userid = userInfo.uid;

    if (id) {
      this.proSer.getProductById(id).subscribe((res) => {
        this.product = res

      })
      this.cartSer.getUserCart(userid).subscribe(res => {
        this.cartItems = res.items.find((item: any) => item.id === id);
      });

    }

  }

  increaseQty(item: any) {
    this.cartSer.increaseQty(item)
  }

  decreaseQty(item: any) {
    this.cartSer.decreaseQty(item)
  }

  selectColor(color: string) {
    this.product.color = color;
  }


  selectImage(image: string) {
    this.product.image = image;
  }

  
  addToCart(item: string) {
    this.cartSer.addToCart(item)
    this.showQtySelector = true;
  }

}
