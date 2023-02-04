import { Ingredient } from "../../types/ingredient"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import isEqual from "lodash/isEqual";

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
    recipe: Recipe; 
    setRecipe: Dispatch<SetStateAction<Recipe>> ;
}
const RenderIngredient : React.FC<IUpdateIngredientObj>= ({ingredient,recipe,setRecipe}) => {

    const [editing,setEditing] = useState(false);
    const [amountVal, setAmountVal] = useState<Ingredient["amount"]>(ingredient.amount);
    const [unitVal, setUnitVal] = useState<Ingredient["unit"]>(ingredient.unit);
    const [nameVal, setNameVal] = useState<Ingredient["name"]>(ingredient.name);

    // ingredients
    const ingredients = recipe.ingredients
    // index of ingrident
    const indexIngredient = ingredients.indexOf(ingredient)

    // spread ingridents into an editable array
    const newIng = [...ingredients]
    // edit array in place with new values 
    newIng.splice(indexIngredient, 1, {amount: amountVal, name: nameVal, unit:unitVal})

    return <div>
        
        {/* {" "+ingredient.amount +" "+ ingredient.name +" "+ ingredient.unit+"   "} */}
        {/*" "+amountVal+" "+unitVal+" "+nameVal+" "*/} 

        {/* <input type={"number"} onChange={(e)=>setAmountVal(100) }/> 
        <input onChange={(e)=>setUnitVal(e.currentTarget.value) }/>
        <input onChange={(e)=>setNameVal(e.currentTarget.value) }/>
         */}
        {editing === false ? <button type="button" onClick={()=>{setEditing(!editing)}}> Edit </button> :null}
        {editing === false ? " "+amountVal+" "+unitVal+" "+nameVal+" " : null}
        

        {editing === true ? <form id={'no-u'}>
            <input type={"number"} min="0" onChange={(e)=>setAmountVal(Number(e.currentTarget.value) ) } value={amountVal} /> 
            <input onChange={(e)=>setUnitVal(e.currentTarget.value) } value={unitVal}/>
            <input onChange={(e)=>setNameVal(e.currentTarget.value) } value={nameVal}/>
            <button type="submit" onClick={()=>{
                setRecipe({...recipe,ingredients: newIng})
                setEditing(!editing)}}> Save </button>
        </form> : null}

    </div>; 
}

export default RenderIngredient;