import { Component, OnInit } from '@angular/core';
import { NavbarCarouselService } from '../Services/NavbarCarouselService.service';
import { AuthService } from '../Services/auth.service';
import { ProductService } from '../Services/product.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartService } from '../Services/cart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  navLink: any
  spinner: boolean = true
  isLogin: boolean = false
  cart!: any
  cartlength: number = 0
  searchitem: string = ''
  allProducts: any[] = [];
  searchname: any
  cartItems: any[] = [];
  userRole: string = '';
  constructor(
    private navCarService: NavbarCarouselService,
    private authSer: AuthService,
    private proSer: ProductService,
    private cartSer: CartService,
    private firestore: AngularFirestore
  ) {

  }


  ngOnInit(): void {
    this.navCarService.getNavLinkGroup().subscribe((res) => {
      this.navLink = res
    })

    const userInfo = this.authSer.getCurrentUser()
    const userid = userInfo.uid;


    this.authSer.checkUserRole(userid).subscribe((role) => {
      this.userRole = role;
    });

    this.cartSer.getUserCart(userid).subscribe((cartData) => {
      this.cartItems = cartData.items;
      this.cartlength = cartData.length;
    });

    //   if (userInfo.id) {
    //     this.proSer.getCartByUserId(userInfo.id).subscribe((res) => {
    //       this.cartlength = res[0].items.length
    //       console.log(this.cartlength);
    //     })
    //   }
    this.isLogin = this.authSer.isLoggedIn()
  }


  logout() {
    this.authSer.logout()
    window.location.href = '/';

  }

  addtoCart(item: any) {

  }
  searchPro() {
    //   const text = this.searchitem
    //   this.spinner = true;
    //   console.log(this.searchitem);

    //   if (text == '') {
    //     this.allProducts = [];
    //     this.spinner = false;
    //   } else {
    //     this.proSer.searchPro(text).subscribe((res) => {
    //       this.allProducts = res;
    //       this.spinner = false;
    //     });
    //   }
  }


  onSearchChange(value: string): void {

    if (!value.trim()) {
      this.allProducts = [];
      this.spinner = true;
      return;

    }

    this.firestore.collection('products')
      .valueChanges()
      .subscribe((products: any[]) => {

        this.allProducts = products.filter(p =>
          p.name?.toLowerCase().includes(value.toLowerCase())
        );
         this.spinner = false;
      });

  }

  //   this.proSer.searchPro(value.trim()).subscribe((res) => {
  //   this.allProducts = res;
  //   this.spinner = false;
  // });
  // }

}
