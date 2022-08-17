import { useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { Recipe } from "../../types/recipe";
import RecipeItem from "../RecipeItem";
import RenderIngredient from "../Iterators/UpdateIngredientObj";
import { json } from "stream/consumers";


interface IAddRecipePage {
}

const AddRecipePage : React.FC = () => {

    const blankRecipe : Recipe = {    
        title : "",
        description: "",
        ingredients: [],
        steps: []}
    const blankIngredient : Ingredient = {
        amount: 0,
        unit: "",
        name: ""}
    const [newRecipe, setNewRecipe] = useState<Recipe>(blankRecipe); //useState is a hook 
    const [newIngredient, setNewIngredient] = useState<Ingredient>(blankIngredient);
    const [newIngredientUnit, setnewIngredientUnit] = useState<Ingredient>(blankIngredient);
    const [newIngredientName, setnewIngredientName] = useState<Ingredient>(blankIngredient);


    // inferred state
    const ingredientList = newRecipe.ingredients

    return <div>
        Add Recipe! 

        <form> 
            <ul>
            <label> Recipe Title: </label>
            <input onChange={(e)=>setNewRecipe({ ...newRecipe, title:e.currentTarget.value})} value={newRecipe.title} placeholder={"Title"} />
            </ul>

            <ul>
            <label> Recipe Description. </label>
            <input onChange={(e)=>setNewRecipe({ ...newRecipe, description:e.currentTarget.value})} value={newRecipe.description} placeholder={"Recipe Description"} />
            </ul>

            <ul>
            <label> Ingredients: </label>
            <input type={"number"} onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value), unit:"", name:""})} placeholder="Amount"/> 
            <input onChange={(e)=>setnewIngredientUnit({...newIngredientUnit, amount:0, unit:e.currentTarget.value, name:""}) } placeholder={"unit"} />
            <input onChange={(e)=>setnewIngredientName({...newIngredientName, amount:0, unit:"TEST", name:e.currentTarget.value}) } placeholder={"Item"} />
            {/* <button type="button" onClick={(e)=>setNewRecipe({ ...newRecipe, ingredients:[...newRecipe.ingredients, {amount: Number(e.currentTarget.value), unit:"", name:""}] })}> Add Ingredient </button> */}
            <button type="button" onClick={(e)=>setNewRecipe({ ...newRecipe, ingredients:[...newRecipe.ingredients, {amount: Number(newIngredient?.amount), unit:newIngredientUnit.unit, name:newIngredientName?.name}] }) }> Add ingredient</button>
            {/* <UpdateIngredient ingredients={newRecipe.ingredients} /> */}
            </ul>

            {ingredientList.map((ingredient)=>{
                /**
                 * 
                 * <NewComponent ingredientList={ingredientList} ingredient=ingredient index=index handleUpdateRecipe=setNewRecipe/>
                 * 
                 * 
                 * const [editing, toggleEditing] = useState(false)
                 * 
                 * {isEditing 
                 * ? (show editing input fields and save button (save button sets recipe with replaced ingredient and sets toggle editing to false))
                 * : (show ingredient in a div or something that doesnt have to be editable)
                 * }
                 * 
                 * ******* <div key={ingredient.amount + ingredient.name + ingredient.unit}>{ingredient.amount +''+ ingredient.name +""+ ingredient.unit}</div>
                 */
               console.log( JSON.stringify(ingredient))
                
                return <div key={ingredient.amount+" "+ingredient.amount+" "+ingredient.unit}>
                <RenderIngredient ingredient={ingredient} recipe={newRecipe} setRecipe={setNewRecipe}/>
                
                </div>
            })}
            <button type={"submit"} onClick={(e)=> {
                e.preventDefault();
                
                console.log(newRecipe);
                } 
                }>
                Print to Console
            </button>

            <button type="button" onClick={()=>setNewRecipe(blankRecipe)}> Reset Recipe </button>
            {/*<button type="button" onClick={()=>{<UpdateIngredient ingredients={newRecipe.ingredients} />} }> Show Ingredeints</button>*/}
        </form>

     </div>; 
}

export default AddRecipePage; 