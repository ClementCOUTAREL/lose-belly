import { Component, Input } from '@angular/core';
import { RecipeDetails } from '../../interfaces/recipes.interfaces';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: RecipeDetails;
  @Input() index: number;
}
