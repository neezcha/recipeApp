import { Ingredient } from "../../types/ingredient"
import { useEffect, useState } from "react";

/*************************************
 * Similar to a To Do list: add, update, itterate to display
 *  Update Item 
 *  Edit Item
 *  Display Item 
 * 
 *
 * Usage will be implamented in UpdateIngredientList.tsx
        <RenderIngredient/>
 *
 *************************************/

interface IUpdateIngredientObj {
    ingredient : Ingredient;

}

const RenderIngredient : React.FC<IUpdateIngredientObj>= ({ingredient}) => {
console.log("Updcate Ingredient Obj at Render Ingredeint")


    return <div>
        
        {ingredient.amount}
        
        {ingredient.unit}
        
        {ingredient.name}
        
    </div>; 
}

export default RenderIngredient;