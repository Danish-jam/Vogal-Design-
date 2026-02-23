import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-ProHighlights',
  templateUrl: './proHighlights.component.html',
  styleUrls: ['./proHighlights.component.css']
})
export class ProHighlightsComponent implements OnInit {

  product: any
  constructor(
    private route: ActivatedRoute,
    private proSer: ProductService

  ) {

  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('proid');
    console.log(productId);


    this.proSer.getCatgegrProId(productId).subscribe((res) => {
      this.product = res
    })
  }

}
