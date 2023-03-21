import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { Step } from "../../types/step"
import { Recipe } from "../../types/recipe";
import RecipeItem from "../RecipeItem";
import RenderIngredient from "../Iterators/UpdateIngredientObj";
import { json } from "stream/consumers";
import RenderStep from "../Iterators/UpdateStepsObj";
import isEqual from "lodash/isEqual";


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
    const blankStep : Step = {
        index : 0,
        instruction : "" }
    
    const [newRecipe, setNewRecipe] = useState<Recipe>(blankRecipe); //useState is a hook 

    const [newIngredient, setNewIngredient] = useState<Ingredient>(blankIngredient);
    const [newIngredientUnit, setnewIngredientUnit] = useState<Ingredient>(blankIngredient);
    const [newIngredientName, setnewIngredientName] = useState<Ingredient>(blankIngredient);

    const [stepIndex, setStepIndex] = useState<Step>(blankStep);
    const [newStepIndex, setNewStepIndex] = useState<Step>(blankStep);
    const [newStepInstruction, setNewStepInstruction] = useState<Step>(blankStep);


    // inferred state
    const ingredientList = newRecipe.ingredients
    const stepsList = newRecipe.steps

    // sort step list
    useEffect(()=>{
        const tempList = [...stepsList]
        tempList.sort((a,b)=>{
            return a.index - b.index
        })

        if(!isEqual(tempList, stepsList)){
            setNewRecipe({ ...newRecipe, steps:tempList})
        }
    }, [stepsList])
    //current largest index 
    const stepIndexMax = stepsList.length

    return <div>
        Add Recipe! 

        <form> 
            <ul>
            <label className="b"> Recipe Title: </label>
            <input onChange={(e)=>setNewRecipe({ ...newRecipe, title:e.currentTarget.value})} value={newRecipe.title} placeholder={"Title"} />
            </ul>

            <ul>
            <label className="b"> Recipe Description. </label>
            <input onChange={(e)=>setNewRecipe({ ...newRecipe, description:e.currentTarget.value})} value={newRecipe.description} placeholder={"Recipe Description"} />
            </ul>

            <ul>
            <label className="b"> Ingredients: </label>
            <input type={"number"} onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value), unit:"", name:""})} value={newIngredient.amount} placeholder="Amount"/> 
            <input onChange={(e)=>setnewIngredientUnit({...newIngredientUnit, amount:0, unit:e.currentTarget.value, name:""}) } placeholder={"Unit"} />
            <input onChange={(e)=>setnewIngredientName({...newIngredientName, amount:0, unit:"TEST", name:e.currentTarget.value}) } placeholder={"Item"} />
            {/* <button type="button" onClick={(e)=>setNewRecipe({ ...newRecipe, ingredients:[...newRecipe.ingredients, {amount: Number(e.currentTarget.value), unit:"", name:""}] })}> Add Ingredient </button> */}
            <button type="button" onClick={(e)=>setNewRecipe({ ...newRecipe, ingredients:[...newRecipe.ingredients, {amount: Number(newIngredient?.amount), unit:newIngredientUnit.unit, name:newIngredientName?.name}] }) }> Add ingredient</button>
            {/* <UpdateIngredient ingredients={newRecipe.ingredients} /> */}
            </ul>
            <ul>
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
                
                return <div key={ingredient.amount+" "+ingredient.unit+" "+ingredient.name}>
                <RenderIngredient ingredient={ingredient} recipe={newRecipe} setRecipe={setNewRecipe}/>
                
                </div>
            })}
            </ul>

            <ul>
                <label className="b"> Steps: </label>
                {/* <input type={"number"} min="0" max="1" onChange={(e)=>setNewStepIndex({...newStepIndex, index:Number(e.currentTarget.value) })} placeholder="Index"/>  */}
                {/* <input onChange={(e)=>setNewStepInstruction({...newStepInstruction, instruction:(e.currentTarget.value)} )} placeholder={"Step"} />*/}
                {/* <button type="button" onClick={(e)=>setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: Number(newStepIndex?.index), instruction:newStepInstruction.instruction}] }) }> Add Step</button>*/}
            </ul>
            <ul>
                {stepsList.map((step)=> {
                    return <div key={step.index+" "+step.instruction}>
                        <RenderStep step={step} recipe={newRecipe} setRecipe={setNewRecipe}/>
                    </div>
                })}
            </ul>
            <ul>
                {/*<input type={"number"} min="0" max="1" onChange={(e)=>setNewStepIndex({...newStepIndex, index:Number(e.currentTarget.value) })} placeholder="Index"/> */}
                <input onChange={(e)=>setNewStepInstruction({...newStepInstruction, instruction:(e.currentTarget.value)} )} />
                <button type="button" onClick={(e)=> {
                    const newStepIndexVar = stepsList.length??0
                    setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStepInstruction.instruction}] })
                    //setNewStepInstruction({...newStepInstruction, instruction:" "} )
                } }> Add Step</button>
            
            </ul>

            <button type={"submit"} onClick={(e)=> {
                e.preventDefault();
                console.log(newRecipe);
                window.localStorage.setItem( newRecipe.title ,JSON.stringify(newRecipe) );
                window.localStorage.setItem( 'recipeList', newRecipe.title );

                } 
                }>
                Save to Loal Storage
            </button>

             <button type="button" onClick={()=> setNewRecipe(blankRecipe) }> Reset Recipe </button>
            {/*<button type="button" onClick={()=>{<UpdateIngredient ingredients={newRecipe.ingredients} />} }> Show Ingredeints</button>*/}
        </form>

     </div>; 
}

export default AddRecipePage; 