import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCartComponent } from './review-cart.component';

describe('ReviewCartComponent', () => {
  let component: ReviewCartComponent;
  let fixture: ComponentFixture<ReviewCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
