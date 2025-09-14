import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarouselDataComponent } from './addCarouselData.component';

describe('AddCarouselData', () => {
  let component: AddCarouselDataComponent;
  let fixture: ComponentFixture<AddCarouselDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddCarouselDataComponent]
    });
    fixture = TestBed.createComponent(AddCarouselDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
