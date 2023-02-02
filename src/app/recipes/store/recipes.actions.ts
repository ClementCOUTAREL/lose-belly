import { createAction, props } from '@ngrx/store';
import {
  DetailedSteps,
  RecipeDetails,
  RecipeExtendedDetails,
} from '../interfaces/recipes.interfaces';

export const START_FETCHING_RECIPES = '[Recipes] Start_Fetching_Recipes';
export const FETCHING_RECIPES_SUCCESS = '[Recipes] Fetching_Recipes_Success';
export const FETCHING_RECIPES_FAILED = '[Recipes] Fetching_Recipes_Failed';

export const START_FETCHING_RECIPE = '[Recipes] Start_Fetching_Recipe';
export const FETCHING_RECIPE_SUCCESS = '[Recipes] Fetching_Recipe_Success';
export const FETCHING_RECIPE_FAILED = '[Recipes] Fetching_Recipe_Failed';

export const START_FETCHING_INSTRUCTIONS =
  '[Recipes] Start_Fetching_Instructions';
export const FETCHING_INSTRUCTIONS_SUCCESS =
  '[Recipes] Fetching_Instructions_Success';
export const FETCHING_INSTRUCTIONS_FAILED =
  '[Recipes] Fetching_Instructions_Failed';

export const startFetchingRecipes = createAction(
  START_FETCHING_RECIPES,
  props<{ payload: string }>()
);
export const fetchingRecipesFailed = createAction(
  FETCHING_RECIPES_FAILED,
  props<{ payload: string }>()
);
export const fetchingRecipesSuccess = createAction(
  FETCHING_RECIPES_SUCCESS,
  props<{ payload: RecipeDetails[] }>()
);

export const startFetchingInstructions = createAction(
  START_FETCHING_INSTRUCTIONS,
  props<{ payload: number }>()
);
export const fetchingInstructionsFailed = createAction(
  FETCHING_INSTRUCTIONS_FAILED,
  props<{ payload: string }>()
);
export const fetchingInstructionsSuccess = createAction(
  FETCHING_INSTRUCTIONS_SUCCESS,
  props<{ payload: DetailedSteps[] }>()
);

export const startFetchingRecipe = createAction(
  START_FETCHING_RECIPE,
  props<{ payload: number }>()
);
export const fetchingRecipeFailed = createAction(
  FETCHING_RECIPE_FAILED,
  props<{ payload: string }>()
);
export const fetchingRecipeSuccess = createAction(
  FETCHING_RECIPE_SUCCESS,
  props<{ payload: RecipeExtendedDetails }>()
);
