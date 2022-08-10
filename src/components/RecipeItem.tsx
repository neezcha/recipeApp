import { useEffect, useState } from "react";
import { Recipe } from "../types/recipe";

interface IRecipeItem {
    recipe : Recipe
}

const RecipeItem : React.FC<IRecipeItem> = ({recipe}) => {

const [value,setValue] = useState(false)

useEffect(()=>{
    console.log(value)
},[value])
    


return <div className={"mb3"} key={recipe.title} onClick={()=>{setValue(!value)}}>
        {recipe.title}
        {recipe.description}
        {recipe.ingredients.map(element => {                       
            return <div key={element.name}>
                    {element.amount}
                    {element.name}
                    {element.unit} 
                    
                </div>
            })}
        </div>;
}
export default RecipeItem;