import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMealDetailsComponent } from './daily-meal-details.component';

describe('DailyMealDetailsComponent', () => {
  let component: DailyMealDetailsComponent;
  let fixture: ComponentFixture<DailyMealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyMealDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyMealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
