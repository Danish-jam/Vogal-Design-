import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../Services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
 
  selector: 'app-explore-catgr',
  templateUrl: './ExploreMore.component.html',
  styleUrls: ['./ExploreMore.component.css']
})
export class ExploreMoreComponent implements OnInit {
@Input() topCategory : any[] = []
  constructor(
    private proSer: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.proSer.getAllProductCategories().subscribe((res) => {
      console.log(res);
      this.topCategory = res.slice(0, 5)
      console.log(this.topCategory);
      this.cdr.detectChanges();
    })
  }


carouselOptions: OwlOptions = {
  loop: true,
  margin: 20,
  nav: false,       
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: false,
  smartSpeed: 600,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 }
  }
};



}
