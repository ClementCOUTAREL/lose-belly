import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { FormsModule } from '@angular/forms';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';

@NgModule({
  declarations: [RecipesComponent, RecipesListComponent, RecipeDetailsComponent, RecipeItemComponent],
  imports: [CommonModule, RecipesRoutingModule, FormsModule],
})
export class RecipesModule {}
