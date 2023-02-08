import React, { useState } from "react";
import { Recipe } from "../../types/recipe";


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

    const [recipeView, setRecipeView] = useState<Recipe>(
        JSON.parse(window.localStorage.getItem('loco moco') ?? '' )
    );


    return <div>
        All Recipies!

        <div>
            <ul> { recipeView.title } </ul>
            <ul> { recipeView.description } </ul>
            <ul> { recipeView.steps.map((thisStep)=>{ return <ul> {thisStep.index} . {thisStep.instruction} </ul> }) }</ul>

        </div>
          

     </div>; 
}

export default AllRecipiesPage;