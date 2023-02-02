import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.production';
import {
  DetailedSteps,
  NutritionDetails,
  RecipeExtendedDetails,
  RecipeResponseData,
} from './interfaces/recipes.interfaces';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  constructor(private http: HttpClient) {}
  fetchRecipes(query: string) {
    let params = new HttpParams().set('apiKey', environment.spoonacularAPIKey);
    params = params.set('query', query);
    return this.http.get<RecipeResponseData>(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: params,
      }
    );
  }

  fetchRecipe(id: number) {
    let params = new HttpParams().set('apiKey', environment.spoonacularAPIKey);
    return this.http.get<RecipeExtendedDetails>(
      'https://api.spoonacular.com/recipes/' + id + '/information',
      {
        params: params,
      }
    );
  }

  fetchRecipeInstructions(id: number) {
    let params = new HttpParams().set('apiKey', environment.spoonacularAPIKey);
    return this.http.get<DetailedSteps[]>(
      'https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions',
      {
        params: params,
      }
    );
  }

  fetchRecipeNutritionDetails(id: number) {
    let params = new HttpParams().set('apiKey', environment.spoonacularAPIKey);
    return this.http.get<NutritionDetails>(
      'https://api.spoonacular.com/recipes/' + id + '/nutritionWidget.json',
      { params: params }
    );
  }
}
