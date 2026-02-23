import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  navbarLinkData: any[] = []
  getid: any
  carouselData: CarouselData[] = []
  constructor(
    private navCarService: NavbarCarouselService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {




  }

  ngOnInit(): void {
    const redomId = Math.floor(Math.random() * 100)

    this.linksform = this.fb.group({
      id: [String(redomId)],
      name: ['', Validators.required],
      link: ['', Validators.required],
      role: ['', Validators.required],
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
    if (!this.linksform.valid) {
      alert('Please fill all required fields');
      return;
    }

    const id = this.linksform.get('id')?.value;
    const formData = this.linksform.value;

    const existing = this.navbarLinkData?.find((val: { id: any }) => val.id == id);

    if (existing) {
      // Update existing navbar link in Firebase
      this.navCarService.updateNavLinkGroup(id, formData).subscribe(
        (res) => {
          alert('Navbar link updated successfully!');
          this.linksform.reset();
          this.navCarService.getNavLinkGroup().subscribe((data) => {
            this.navbarLinkData = data;
          });
        },
        (error) => {
          console.error('Error updating navbar link:', error);
          alert('Failed to update navbar link');
        }
      );
    } else {
      // Add new navbar link to Firebase
      this.navCarService.postNavLinkGroup(formData).subscribe(
        (res) => {
          alert('Navbar link added successfully!');
          this.linksform.reset();
          this.navCarService.getNavLinkGroup().subscribe((data) => {
            this.navbarLinkData = data;
          });
        },
        (error) => {
          console.error('Error adding navbar link:', error);
          alert('Failed to add navbar link');
        }
      );
    }
  }


  deleteLink(Link_id: string) {
    if (confirm('Are you sure you want to delete this navbar link?')) {
      this.navCarService.deleteNavLinkGroup(Link_id).subscribe(
        (res) => {
          console.log('Navbar link deleted:', res);
          alert('Navbar link deleted successfully!');
          this.navCarService.getNavLinkGroup().subscribe((data) => {
            this.navbarLinkData = data;
          });
        },
        (error) => {
          console.error('Error deleting navbar link:', error);
          alert('Failed to delete navbar link');
        }
      );
    }
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
    if (!this.carouselForm.valid) {
      alert('Please fill all required fields');
      return;
    }

    let id = this.carouselForm.get('id')?.value;
    let formData = this.carouselForm.value;

    if (!id || id.trim() === '') {
      id = Date.now().toString();
      formData.id = id;
      this.carouselForm.get('id')?.setValue(id);
    }

    const existing = this.carouselData?.find((val: { id: any }) => val.id == id);

    if (existing) {
      // Update existing carousel in Firebase
      this.navCarService.updateCarouselData(id, formData).subscribe(
        (res) => {
          alert('Carousel data updated successfully!');
          this.carouselForm.reset();
          this.navCarService.getCarouselData().subscribe((data) => {
            this.carouselData = data;
          });
        },
        (error) => {
          console.error('Error updating carousel:', error);
          alert('Failed to update carousel data');
        }
      );
    } else {
      // Add new carousel to Firebase
      this.navCarService.postCarouselData(formData).subscribe(
        (res) => {
          alert('Carousel data added successfully!');
          this.carouselForm.reset();
          this.navCarService.getCarouselData().subscribe((data) => {
            this.carouselData = data;
          });
        },
        (error) => {
          console.error('Error adding carousel:', error);
          alert('Failed to add carousel data');
        }
      );
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


  removeCarouselData(id: string) {
    if (confirm('Are you sure you want to delete this carousel?')) {
      this.navCarService.deleteCarouselData(id).subscribe(
        (res) => {
          console.log('Carousel deleted:', res);
          alert('Carousel deleted successfully!');
          this.navCarService.getCarouselData().subscribe((data) => {
            this.carouselData = data;
          });
        },
        (error) => {
          console.error('Error deleting carousel:', error);
          alert('Failed to delete carousel');
        }
      );
    }
  }











}
