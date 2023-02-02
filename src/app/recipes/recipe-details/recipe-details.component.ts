import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  RecipeDetails,
  RecipeExtendedDetails,
} from '../interfaces/recipes.interfaces';
import * as fromApp from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  recipe: RecipeExtendedDetails;
  loading = false;
  error = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.storeSub = this.store.select('recipes').subscribe((state) => {
      this.loading = state.loading;
      this.error = state.error;
      this.recipe = state.selectedRecipeDetails;
    });
    this.store.dispatch(RecipeActions.startFetchingRecipe({ payload: +id }));
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
