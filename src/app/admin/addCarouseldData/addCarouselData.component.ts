import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarouselData } from 'src/app/models/carousel.model';
import { NavbarCarouselService } from 'src/app/Services/NavbarCarouselService.service';

@Component({
  selector: 'app-addCarouselData',
  templateUrl: './addCarouselData.component.html',
  styleUrls: ['./addCarouselData.component.css'],
 
})
export class AddCarouselDataComponent implements OnInit {

  linksform!: FormGroup
  carouselForm!: FormGroup;
  navbarLinkData: any
  getid: any
  carouselData!: CarouselData[]
  constructor(
    private navCarService : NavbarCarouselService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {




  }

  ngOnInit(): void {
    const redomId = Math.floor(Math.random() * 100)

    this.linksform = this.fb.group({
      id: String([redomId]),
      name: ['', Validators.required],
      link: ['', Validators.required]
    });


this.carouselForm = this.fb.group({
  id: [String(redomId)],
  bgImg: ['', Validators.required],
  heading_1: ['', Validators.required],
  heading_2: ['', Validators.required],
  text: ['', Validators.required],
  bntText_1: [''],
  bntText_2: [''],
  bntText_3: [''],
  
  bntLink_1: [''],
  bntLink_2: [''],
  bntLink_3: [''],
});





    this.navCarService.getNavLinkGroup().subscribe((res) => {
      this.navbarLinkData = res
    })

    this.navCarService.getCarouselData().subscribe((res) => {
      this.carouselData = res
      console.log(this.carouselData);
    })
  }

  onSubmit() {
    const id = this.linksform.get('id')?.value;


    const existing = this.navbarLinkData.find((val: { id: any }) => val.id == id);

    if (existing) {
      const updatedlink = this.linksform.value
      this.navCarService.updateNavLinkGroup(id, updatedlink).subscribe((res) => {
        window.location.reload();
      });
    } else {

      this.navCarService.postNavLinkGroup(this.linksform.value).subscribe((res) => {
        window.location.reload();
      });
    }
  }


  deleteLink(Link_id: any) {
    this.navCarService.deleteNavLinkGroup(Link_id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  editLink(val: any) {
    console.log(val);

    this.linksform.patchValue({
      id: val.id,
      name: val.name,
      link: val.link
    });
  }



  onSubmitCarouslData() {
    const id = this.carouselForm.get('id')?.value;
    const existing = this.carouselData.find((val: { id: any }) => val.id == id);

    if (existing) {
      const updateCarousel = this.carouselForm.value

      this.navCarService.updateCarouselData(id, updateCarousel).subscribe((res) => {
        window.location.reload();
      });
    } else {

      this.navCarService.postCarouselData(this.carouselForm.value).subscribe((res) => {
        window.location.reload();
      });
    }
  }

  editCarousel(item: any) {
    console.log(item);

    this.carouselForm.patchValue({
      id: item.id,
      bgImg: item.bgImg,
      heading_1: item.heading_1,
      heading_2: item.heading_2,
      text: item.text,
      bntText_1: item.bntText_1,
      bntText_2: item.bntText_2,
      bntText_3: item.bntText_3,
      bntLink_1: item.bntLink_1,
      bntLink_2: item.bntLink_2,
      bntLink_3: item.bntLink_3,
    });
  }


  removeCarouselData(id : any){
      this.navCarService.deleteCarouselData(id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }











}
