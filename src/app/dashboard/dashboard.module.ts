import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DailyMealsListComponent } from './daily-meals/daily-meals-list/daily-meals-list.component';
import { DailyMealDetailsComponent } from './daily-meals/daily-meal-details/daily-meal-details.component';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DailyMealsListComponent,
    DailyMealDetailsComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule],
})
export class DashboardModule {}
