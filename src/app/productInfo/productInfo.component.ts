import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-details-pro',
  templateUrl: './ProductInfo.component.html',
  styleUrls: ['./ProductInfo.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: any

  constructor(
    private route: ActivatedRoute,
    private proSer: ProductService
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    console.log(id);

    if (id) {
      this.proSer.getProductId(id).subscribe((res) => {
        this.product = res
      })
    }

  }





}
