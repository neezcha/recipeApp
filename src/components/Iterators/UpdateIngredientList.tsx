import { Ingredient } from "../../types/ingredient"
import { useEffect, useState } from "react";
import RenderIngredient from "./UpdateIngredientObj"

/*************************************
 * Similar to a To Do list: add, update, itterate to display
 *  Update Item 
 * Iterate through list to display 
 * Edit item in list 
 * 
 *
 * Usage will look like the below code and be implamented in AddRecipePages.tsx
    {Recipe.ingredients.map((ingredient)=>{
        <UpdateIngredient/>
    })}
 *
 *************************************/

interface IUpdateIngredientComponent {
    ingredients : Ingredient [];

}

const UpdateIngredient : React.FC<IUpdateIngredientComponent>= ({ingredients}) => {
    const [value,setValue] = useState (false)
    console.log("Update Ingredient List at Update Ingredeint")

    
    return <div>
        "IDK"
        {ingredients.map((ingredient) => {
            <RenderIngredient ingredient={ingredient}/>
            return null; 
            } )}
    </div>

}


export default UpdateIngredient;