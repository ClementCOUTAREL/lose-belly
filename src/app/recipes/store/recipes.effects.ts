import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import {
  catchError,
  concat,
  exhaustAll,
  exhaustMap,
  forkJoin,
  map,
  merge,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  DetailedSteps,
  RecipeExtendedDetails,
  RecipeResponseData,
} from '../interfaces/recipes.interfaces';
import { RecipesService } from '../recipes.service';
import * as RecipeActions from './recipes.actions';
import * as fromRecipes from './recipes.reducer';

@Injectable()
export class RecipesEffects {
  constructor(
    private store: Store<fromRecipes.AppState>,
    private actions$: Actions,
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.START_FETCHING_RECIPES),
      mergeMap((recipeAction: { payload: string }) =>
        this.recipeService.fetchRecipes(recipeAction.payload).pipe(
          map((response) =>
            RecipeActions.fetchingRecipesSuccess({ payload: response.results })
          ),
          catchError((error) => {
            if (!error.error || !error.error.message) {
              return of(
                RecipeActions.fetchingRecipesFailed({
                  payload: 'Cant fetch recipes',
                })
              );
            } else {
              return of(RecipeActions.fetchingRecipesFailed(error.message));
            }
          })
        )
      )
    );
  });

  fetchRecipe = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.START_FETCHING_RECIPE),
      switchMap((recipeAction: { payload: number }) => {
        const recipe = this.recipeService.fetchRecipe(recipeAction.payload);
        const instructions = this.recipeService.fetchRecipeInstructions(
          recipeAction.payload
        );
        const nutrition = this.recipeService.fetchRecipeNutritionDetails(
          recipeAction.payload
        );

        return forkJoin([recipe, instructions, nutrition]).pipe(
          map((result) => {
            const fullRecipe = {
              ...result[0],
              detailledInstructions: result[1],
              nutrition: result[2],
            };
            return fullRecipe;
          }),
          map((result) => {
            return RecipeActions.fetchingRecipeSuccess({ payload: result });
          })
        );
      })
    );
  });
}
