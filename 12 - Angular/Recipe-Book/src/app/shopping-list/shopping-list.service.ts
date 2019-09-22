import { Ingredient } from './../shared/ingredients.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[]=[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];


    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
    //     for(let ingredient of ingredients){
    //         this.addIngredient(ingredient);
    //     }
        this.ingredients.push(...ingredients); // pushes an array with ...ingredients to an array --- very nice feature of ES6 <3
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}