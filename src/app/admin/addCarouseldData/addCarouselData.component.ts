import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarouselData } from 'src/app/models/carousel.model';
import { NavigationLink } from 'src/app/models/navlink.model';
import { NavbarCarouselService } from 'src/app/Services/NavbarCarouselService.service';

@Component({
  selector: 'app-addCarouselData',
  templateUrl: './addCarouselData.component.html',
  styleUrls: ['./addCarouselData.component.css']
})
export class AddCarouselDataComponent implements OnInit {

  linksForm!: FormGroup;
  carouselForm!: FormGroup;

  navbarLinkData: NavigationLink[] = [];
  carouselData: CarouselData[] = [];

  constructor(private navCarService: NavbarCarouselService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
    this.loadNavbarLinks();
    this.loadCarouselData();
  }

  private initForms(): void {
    const randomId = Math.floor(Math.random() * 100).toString();

    this.linksForm = this.fb.group({
      id: [randomId],
      name: ['', Validators.required],
      link: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.carouselForm = this.fb.group({
      id: [randomId],
      bgImg: ['', Validators.required],
      heading_1: ['', Validators.required],
      heading_2: ['', Validators.required],
      text: ['', Validators.required],
      bntText_1: [''], bntText_2: [''], bntText_3: [''],
      bntLink_1: [''], bntLink_2: [''], bntLink_3: [''],
    });
  }

  // ---------------- Navbar ----------------
  loadNavbarLinks() { this.navCarService.getNavLinkGroup().subscribe(res => this.navbarLinkData = res); }

  submitNavbar(): void {
    if (!this.linksForm.valid) return alert('Fill all fields!');
    const data = this.linksForm.value;
    const existing = this.navbarLinkData.find(l => l.id === data.id);

    const obs = existing ? this.navCarService.updateNavLinkGroup(data.id, data) : this.navCarService.postNavLinkGroup(data);
    obs.subscribe(() => {
      alert(`Navbar link ${existing ? 'updated' : 'added'}!`);
      this.linksForm.reset();
      this.loadNavbarLinks();
    }, () => alert('Operation failed!'));
  }

  editNavbar(link: NavigationLink) { this.linksForm.patchValue(link); }

  deleteNavbar(id: string) {
    if (!confirm('Delete this navbar link?')) return;
    this.navCarService.deleteNavLinkGroup(id).subscribe(() => this.loadNavbarLinks());
  }

  // ---------------- Carousel ----------------
  loadCarouselData() { this.navCarService.getCarouselData().subscribe(res => this.carouselData = res); }

  submitCarousel(): void {
    if (!this.carouselForm.valid) return alert('Fill all fields!');
    let data = this.carouselForm.value;
    if (!data.id) data.id = Date.now().toString();

    const existing = this.carouselData.find(c => c.id === data.id);
    const obs = existing ? this.navCarService.updateCarouselData(data.id, data) : this.navCarService.postCarouselData(data);

    obs.subscribe(() => {
      alert(`Carousel ${existing ? 'updated' : 'added'}!`);
      this.carouselForm.reset();
      this.loadCarouselData();
    }, () => alert('Operation failed!'));
  }

  editCarousel(item: CarouselData) { this.carouselForm.patchValue(item); }

  deleteCarousel(id: string) {
    if (!confirm('Delete this carousel?')) return;
    this.navCarService.deleteCarouselData(id).subscribe(() => this.loadCarouselData());
  }
} 