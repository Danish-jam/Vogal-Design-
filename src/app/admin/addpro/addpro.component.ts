import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { PopularCategories } from 'src/app/models/PopularCategories.model';
import { Article } from 'src/app/models/article.model';
import { PartnerService } from 'src/app/Services/partner.service';
import { ProductService } from 'src/app/Services/product.service';
import { CommonModule } from '@angular/common'
import { Category } from 'src/app/models/category.model';
import { Partner } from 'src/app/models/partner.model';

@Component({
  selector: 'app-addpro',
  templateUrl: './addpro.component.html',
  styleUrls: ['./addpro.component.css'],
})
export class AddproComponent implements OnInit {
  PopularCatgrForm!: FormGroup
  productForm!: FormGroup;
  allPro!: Product[]
  DiscoverProForm!: FormGroup;
  ArticleForm!: FormGroup
  allDiscoverPro!: PopularCategories[]
  NewsArticles: Article[] = []
  categories!: Category[];
  constructor(
    private fb: FormBuilder,
    private proSer: ProductService,
    private activtedRoute: ActivatedRoute,
    private partnerSer: PartnerService,

  ) {

  }

  sideBarData: any[] = [
    {
      name: "Add New Product",
      icon: "bi bi-tags"
    },
    {
      name: "Add More Catgories",
      icon: "bi bi-box-seam"
    },
    {
      name: "Add Logo Partner",
      icon: "bi bi-image"
    },
    {
      name: "Add Article Product",
      icon: "bi bi-newspaper"
    }
  ]

  selectedItem: string = ''
  proQty: number = 1
  allCatgrPro: PopularCategories[] = []
  partnerData: Partner[] = []

  id!: any;
  partnerForm !: FormGroup
  ngOnInit(): void {
    this.selectedItem = this.sideBarData[0].name
    this.initAllForms()


    this.proSer.getCategories().subscribe((res) => {
      this.categories = res
    })


    this.id = this.activtedRoute.snapshot.paramMap.get('proid')
    console.log(this.id);
 

    if (this.id) {
      this.proSer.getProductId(this.id).subscribe((res: any) => {

        const updatePro = res

        // bgimg1 to img
        // headingPro to name
        // producthomePage to showOnHomePage

        this.productForm.patchValue({
          img: updatePro.img,
          name: updatePro.name,
          price: updatePro.price,
          id: updatePro.id,
          category: updatePro.category,
          showOnHomePage: updatePro.showOnHomePage
        })

      })

    }


    this.partnerSer.getPartner().subscribe((res) => {
      this.partnerData = res
    })

    this.partnerSer.getNewsArticle().subscribe((res) => {
      this.NewsArticles = res
    })



  }


  initAllForms() {

    this.PopularCatgrForm = this.fb.group({
      img: ['', Validators.required],
      name: ['', Validators.required],
      topCategoryPro: ['', Validators.required],
      showOnHomePage: ['', Validators.required]
    })

    this.productForm = this.fb.group({
      img: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      showOnHomePage: ['', Validators.required],
      qty: [this.proQty]
    })


    this.partnerForm = this.fb.group({
      imgurl: [''],
      showHomePge: [''],
    })

    this.ArticleForm = this.fb.group({
      imgUrl: [''],
      heading: [''],
      showHomePage: [''],
    })
  }



  submitCatgrPro() {

    if (this.id) {
      this.proSer.updateCategrPro(this.id, this.PopularCatgrForm.value).subscribe((res) => {
        console.log(res);
        this.PopularCatgrForm.reset();
      })
    } else {
      this.proSer.postCategrPro(this.PopularCatgrForm.value).subscribe((res) => {
        console.log(res);
        this.PopularCatgrForm.reset();
      })

    }

  }


  addNewPro() {

    if (this.id) {
      this.proSer.updateProduct(this.id, this.productForm.value).subscribe((res) => {
        console.log(res);
        this.productForm.reset();
      })
    } else {
      //  check  if product name already exist then show msg otherwise create new product 
      const newName = this.productForm.get('name')?.value
      console.log(typeof newName);
      
      this.proSer.getProductByName(newName.trim()).subscribe((res) => {
        console.log(res);
        if (res) {
          alert("This name is already assigned to a product.");
        } else {
          this.proSer.postProduct(this.productForm.value).subscribe((res) => {
            this.productForm.reset();
          })
        }
      })



    }

  }


  addPartner() {

    if (this.id) {
      this.partnerSer.updatePartner(this.id, this.partnerForm.value).subscribe((res) => {
        console.log(res);
        this.partnerForm.reset();
      })
    } else {
      this.partnerSer.postPartner(this.partnerForm.value).subscribe((res) => {
        console.log(res);
        this.partnerForm.reset();
      })

    }

  }

  partner(item: any) {
    this.partnerForm.patchValue({
      imgurl: item.imgurl,
      showHomePge: item.showHomePge,
    })
    if (this.partnerForm.contains('id')) {
      this.partnerForm.patchValue({ id: item.id });
    } else {
      this.partnerForm.addControl('id', this.fb.control(item.id));
    }

  }


  deleteItem(id: number) {
    this.partnerSer.deletePartner(id).subscribe((res) => {
      res
    })
  }


  submitArtilePro() {

    if (this.id) {
      this.partnerSer.updateNewsArticle(this.id, this.ArticleForm.value).subscribe((res) => {
        console.log(res);
        this.ArticleForm.reset();
      })
    } else {
      this.partnerSer.postNewsArticle(this.ArticleForm.value).subscribe((res) => {
        console.log(res);
        this.ArticleForm.reset();
      })

    }

  }

  editArticlePro(item: any) {
    this.ArticleForm.patchValue({
      imgUrl: item.imgUrl,
      heading: item.heading,
      showHomePage: item.showHomePage,
    })
    if (this.ArticleForm.contains('id')) {
      this.ArticleForm.patchValue({ id: item.id });
    } else {
      this.ArticleForm.addControl('id', this.fb.control(item.id));
    }
  }

  deleteArticlePro(id: number) {
    this.partnerSer.deleteNewsArticle(id).subscribe((res) => {
      console.log(res);

    })
  }

}


