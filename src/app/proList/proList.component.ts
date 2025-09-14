import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-allproducts',
  templateUrl: './proList.component.html',
  styleUrls: ['./proList.component.css'],
})
export class ProListComponent implements OnInit{
searchitem! : string
constructor (
  private proSer : ProductService
){

}
allProducts : Product[] = []
ngOnInit(): void {
      this.proSer.getProducts().subscribe((res : Product[]) =>{
        this.allProducts = res
      })
}

addtoCart(pro : any){
  this.proSer.addToCart(pro)
}
}
