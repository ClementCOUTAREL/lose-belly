import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/recipes/recipes.model';
import {
  RecipeDetails,
  RecipeExtendedDetails,
} from '../interfaces/recipes.interfaces';
import {
  fetchingInstructionsFailed,
  fetchingInstructionsSuccess,
  fetchingRecipeFailed,
  fetchingRecipesFailed,
  fetchingRecipesSuccess,
  fetchingRecipeSuccess,
  startFetchingInstructions,
  startFetchingRecipe,
  startFetchingRecipes,
} from './recipes.actions';

export interface State {
  recipes: RecipeDetails[];
  selectedRecipeDetails: RecipeExtendedDetails;
  loading: boolean;
  error: string;
}

export interface AppState {
  recipes: State;
}

const initialState: State = {
  recipes: [],
  selectedRecipeDetails: null,
  loading: false,
  error: '',
};

export const recipesReducer = createReducer(
  initialState,
  on(startFetchingRecipes, (state, { payload }) => ({
    ...state,
    loading: true,
  })),
  on(fetchingRecipesSuccess, (state, { payload }) => {
    const newRecipes = state.recipes.slice();
    payload.map((recipe) => newRecipes.push(recipe));
    return { ...state, recipes: newRecipes, loading: false };
  }),
  on(fetchingRecipesFailed, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(startFetchingRecipe, (state) => ({ ...state, loading: true, error: '' })),
  on(fetchingRecipeSuccess, (state, { payload }) => ({
    ...state,
    selectedRecipeDetails: payload,
    loading: false,
    error: '',
  })),
  on(fetchingRecipeFailed, (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
  })),
  on(fetchingInstructionsSuccess, (state, { payload }) => ({
    ...state,
    selectedRecipeDetails: {
      ...state.selectedRecipeDetails,
      detailledInstructions: payload,
    },
  })),
  on(fetchingInstructionsFailed, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);
