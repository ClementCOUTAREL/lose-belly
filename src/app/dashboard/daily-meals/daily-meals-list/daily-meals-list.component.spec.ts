import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMealsListComponent } from './daily-meals-list.component';

describe('DailyMealsListComponent', () => {
  let component: DailyMealsListComponent;
  let fixture: ComponentFixture<DailyMealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyMealsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyMealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
