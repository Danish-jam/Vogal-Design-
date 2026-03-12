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
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private firestore: AngularFirestore
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


    // this.partnerSer.getPartner().subscribe((res) => {
    //   this.partnerData = res
    // })

    // this.partnerSer.getNewsArticle().subscribe((res) => {
    //   this.NewsArticles = res
    // })

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
      // this.proSer.updateCategrPro(this.id, this.PopularCatgrForm.value).subscribe((res) => {
      //   console.log(res);
      //   this.PopularCatgrForm.reset();
      // })
    } else {
      this.proSer.postCategrPro(this.PopularCatgrForm.value).subscribe((res) => {
        console.log(res);
        this.PopularCatgrForm.reset();
      })

    }

  }


  addNewPro() {

    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;
    const newName = formValue.name?.trim();

    if (!newName) return;

    // 🔹 UPDATE MODE
    if (this.id) {

      this.proSer.updateProduct(this.id, formValue)
        .subscribe(() => {
          this.productForm.reset();
        });

    }

    // 🔹 CREATE MODE
    else {

      this.proSer.getProductByName(newName)
        .subscribe((res) => {

          if (res.length > 0) {
            alert("This name is already assigned to a product.");
            return;
          }

          this.proSer.postProduct(formValue)
            .subscribe(() => {
              this.productForm.reset();
            });

        });

    }

  }


  addPartner() {
    const partnerData = this.partnerForm.value;

    if (this.id) {
      // Update existing partner
      this.partnerSer.updatePartner(this.id, partnerData)
      this.partnerForm.reset();
      this.id = null; // Clear the ID after update
    } else {
      // Add new partner
      this.partnerSer.postPartner(partnerData)
      this.partnerForm.reset();
    }
  }

  partner(item: any) {
    console.log(item);
    this.id = item.id;
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
    const partnerId = id.toString(); // Convert to string if your Firestore document IDs are strings
    this.partnerSer.deletePartner(partnerId);
  }


  submitArtilePro() {
    const articleData = this.ArticleForm.value;
    if (this.id) {
      this.partnerSer.updateNewsArticle(this.id, articleData)
      this.ArticleForm.reset();
      this.id = null; // Clear the ID after update
    } else {
      this.partnerSer.postNewsArticle(articleData)
      this.ArticleForm.reset();
    }

  }

  editArticlePro(item: any) {
    console.log(item);
    this.id = item.id;
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
    const articleId = id.toString(); // Convert to string if your Firestore document IDs are strings
    this.partnerSer.deleteNewsArticle(articleId);
  }

}


// if (this.id) {
//     this.partnerSer.updatePartner(this.id, this.partnerForm.value).subscribe((res) => {
//       console.log(res);
//       this.partnerForm.reset();
//     })
//   } else {
//     this.partnerSer.postPartner(this.partnerForm.value).subscribe((res) => {
//       console.log(res);
//       this.partnerForm.reset();
//     })

//   }
