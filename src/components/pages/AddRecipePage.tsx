import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { Step } from "../../types/step"
import { Recipe } from "../../types/recipe";
import RecipeItem from "../RecipeItem";
import RenderIngredient from "../Iterators/UpdateIngredientObj";
import { json } from "stream/consumers";
import RenderStep from "../Iterators/UpdateStepsObj";
import isEqual from "lodash/isEqual";
import { Button, Dropdown, SvgIcon, TextField } from "@cmsgov/design-system";


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
        <h2> Add Recipe! </h2>

        <form> 
            <ul>
                <TextField
                    label="RecipeTitle:"
                    name="newRecipeTitleInputFeild"
                    onChange={(e)=>setNewRecipe({ ...newRecipe, title:e.currentTarget.value})} 
                    value={newRecipe.title}
                    placeholder={"Enter Recipe Title"}
                />
            </ul>

            <ul>
                <TextField
                    label="Recipe Description:"
                    name="newRecipeDescInputFeild"
                    onChange={(e)=>setNewRecipe({ ...newRecipe, description:e.currentTarget.value})} 
                    value={newRecipe.description}
                    placeholder={"Enter Recipe Description"}
                    multiline
                    rows={3}
                />
            </ul>
            <hr/>
            <ul className="ds-u-flex-direction--row flex">
                <h4> Recipe Ingredients </h4>
                <Dropdown
                    label="Ingredient Unit:"
                    name="newRecipeIngredientUnitInputFeild"
                    onChange={(e)=>setnewIngredientUnit({...newIngredientUnit, amount:0, unit:e.currentTarget.value, name:""}) } 
                    placeholder={"Unit"}
                    options={[
                      {
                        label: '- Select a Unit of Measurment -',
                        value: 'N/A'
                      },
                      {
                        label: 'cup',
                        value: 'cup'
                      },
                      {
                        label: 'oz',
                        value: 'oz'
                      },
                      {
                        label: 'fl oz',
                        value: 'fl oz'
                      },
                      {
                        label: 'tbs',
                        value: 'tbs'
                      },
                      {
                        label: 'tsp',
                        value: 'tsp'
                      }
                    ]}
                />
                <TextField
                    label="Amount of Ingredient:"
                    name="newRecipeIngredientsAmountInputFeild"
                    autoFocus
                    numeric
                    size="small"
                    pattern="[0-9]*"
                    onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value), unit:"", name:""})} 
                    value={newIngredient.amount} 
                    placeholder="Enter Amount of Ingredient"
                />
                <TextField
                    label="Ingredient:"
                    name="newRecipeIngredientsNameInputFeild"
                    
                    onChange={(e)=>setnewIngredientName({...newIngredientName, amount:0, unit:"", name:e.currentTarget.value}) }
                    value={newIngredientName.name} 
                    placeholder="Enter Ingredient Name"
                />


            
            
            <div> 
                <Button
                className="ds-u-margin-right--2 ds-u-padding-y--2"
                onClick={(e)=>setNewRecipe({ ...newRecipe, ingredients:[...newRecipe.ingredients, {amount: Number(newIngredient?.amount), unit:newIngredientUnit.unit, name:newIngredientName?.name}] }) }
                >➕
                </Button> 
                <b> Summary: </b>{newIngredient.amount} {newIngredientUnit.unit}  {newIngredientName.name}
            </div>
            
            </ul>
            <ul>
            <h3> Ingredients </h3>
            {ingredientList.map((ingredient)=>{

                console.log( JSON.stringify(ingredient))
                
                return <div key={ingredient.amount+" "+ingredient.unit+" "+ingredient.name}>
                <RenderIngredient ingredient={ingredient} recipe={newRecipe} setRecipe={setNewRecipe}/>
                
                </div>
            })}
            </ul>
            <hr/>
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
                <TextField
                        label="New Step:"
                        name="newStepInputFeild"
                        onClick={(e)=> {
                            const newStepIndexVar = stepsList.length??0
                            setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStepInstruction.instruction}] })
                        } }
                        placeholder="Enter New Step Instructions"
                        multiline
                        rows={3}
                />
                <Button className="ds-u-margin--1 ds-u-padding-y--2" 
                    onClick={(e)=> {
                    const newStepIndexVar = stepsList.length??0
                    setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStepInstruction.instruction}] })
                } }> ➕</Button>
            
            </ul>

            <Button variation="solid" className="ds-u-margin--1" type={"submit"} onClick={(e)=> {
                e.preventDefault();
                console.log(newRecipe);
                window.localStorage.setItem( newRecipe.title ,JSON.stringify(newRecipe) );
                window.localStorage.setItem( 'recipeList', newRecipe.title );

                } 
                }>
                Save to Local Storage
            </Button>

             <Button className="ds-u-margin--1" type="button" onClick={()=> setNewRecipe(blankRecipe) }> Reset Recipe </Button>
            {/*<button type="button" onClick={()=>{<UpdateIngredient ingredients={newRecipe.ingredients} />} }> Show Ingredeints</button>*/}
        </form>

     </div>; 
}

export default AddRecipePage; 