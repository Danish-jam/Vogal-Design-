import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      buttons: this.fb.array([])   // 👈 Dynamic buttons
    });

    // Default ek button add kar do
    this.addButton();
  }

  get buttons(): FormArray {
    return this.carouselForm.get('buttons') as FormArray;
  }

  addButton() {
    const buttonGroup = this.fb.group({
      text: [''],
      link: ['']
    });

    this.buttons.push(buttonGroup);
  }

  removeButton(index: number) {
    this.buttons.removeAt(index);
  }
  // ---------------- Navbar ----------------
  loadNavbarLinks() { this.navCarService.getNavLinkGroup().subscribe(res => this.navbarLinkData = res); }

  submitNavbar(): void {
    if (this.linksForm.invalid) {
      return alert('Fill all fields!');
    }

    const data = this.linksForm.value;
    const isUpdate = this.navbarLinkData.some(link => link.id === data.id);

    const request$ = isUpdate
      ? this.navCarService.updateNavLinkGroup(data.id, data)
      : this.navCarService.postNavLinkGroup(data);

    request$.subscribe({
      next: () => {
        alert(`Navbar link ${isUpdate ? 'updated' : 'added'}!`);
        this.linksForm.reset();
        this.loadNavbarLinks();
      },
      error: () => alert('Operation failed!')
    });
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