import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecipeDetails } from '../interfaces/recipes.interfaces';
import * as RecipesActions from '../store/recipes.actions';
import * as fromApp from '../store/recipes.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: RecipeDetails[] = [];
  loading = false;
  error = '';

  private recipeSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.recipeSub = this.store.select('recipes').subscribe((state) => {
      this.recipes = state.recipes;
      this.loading = state.loading;
      this.error = state.error;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const query = form.value.query;
    this.store.dispatch(
      RecipesActions.startFetchingRecipes({ payload: query })
    );
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
