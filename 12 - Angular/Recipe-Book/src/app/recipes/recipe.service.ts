import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] =[
    //     new Recipe('Tastsy Schnitzel','A super-tasty Schnitzel - just awesome !'
    //     ,'../../../assets/img/Schnitzel.jpg',[
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries',20)
    //     ]),
    //     new Recipe('Big Fat Burger','BITE ON THATTTTTTTTTT XD'
    //     ,'../../../assets/img/Burger.jpg',[
    //         new Ingredient('Buns',2),
    //         new Ingredient('Meat',1),
    //     ]),
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService:ShoppingListService){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice(); //getting a copy of recipes with slice
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index , 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}