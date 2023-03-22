import React, { useState } from "react";
import { Recipe } from "../../types/recipe";
import { Button } from "@cmsgov/design-system";



interface IAllRecipiesPage {
}

const AllRecipiesPage : React.FC = () => {

    /*
    function useRecipeFromLocalStorage (key: string|null, defaultValue=''){
        const [recipeView, setRecipeView] = React.useState(
          ()=>{
            const valueInLocalStorage = window.localStorage.getItem(key) 
            if(valueInLocalStorage){
              return JSON.parse(valueInLocalStorage)
            }return defaultValue
          } 

        )
    }*/
/*
    const [recipeView, setRecipeView] = useState<Recipe>(
        JSON.parse(window.localStorage.getItem('loco moco') ?? '' )
    );

    for (var i = 0; i < localStorage.length; i++){
      // do something with localStorage.getItem(localStorage.key(i));
      JSON.parse(window.localStorage.key(i) ?? '' )
    }
*/

    return <div>
        <h4> All Recipies! </h4>
        
        {/****
        <div>
            <ul> { recipeView.title } </ul>
            <ul> { recipeView.description } </ul>
            <ul> { recipeView.ingredients.map((thisIng)=>{ return <ul> {thisIng.amount} . {thisIng.unit} : {thisIng.name}</ul> }) }</ul>
            <ul> { recipeView.steps.map((thisStep)=>{ return <ul> {thisStep.index} . {thisStep.instruction} </ul> }) }</ul>

            <ul> {/*gonna need a component hear to iterate through items in local storage and displayakk recipes/} </ul>
        </div>
        ***/}

     </div>; 
}

export default AllRecipiesPage;