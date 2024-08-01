import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { Step } from "../../types/step"
import { Recipe } from "../../types/recipe";
import RecipeItem from "../RecipeItem";
import RenderIngredient from "../Iterators/UpdateIngredientObj";
import { json } from "stream/consumers";
import RenderStep from "../Iterators/UpdateStepsObj";
import isEqual from "lodash/isEqual";
import { Card, Button, Box, Text, TextField, TextArea, Heading, Flex, Grid, Select, Separator, Strong } from '@radix-ui/themes'


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

    return <>
        <Heading as="h2"> Add Recipe! </Heading>

        <Grid p="5"  gap="3"> 
            <Box>
                <Text as="label"><Strong>RecipeTitle:</Strong></Text>
                <TextField.Root
                        name="newRecipeTitleInputFeild"
                        onChange={(e)=>setNewRecipe({ ...newRecipe, title:e.currentTarget.value})} 
                        value={newRecipe.title}
                        placeholder={"Enter Recipe Title"}
                        />
            </Box>
            <Box>
            <Text as="label"><Strong>Recipe Description:</Strong></Text>
                <TextArea
                        name="newRecipeDescInputFeild"
                        onChange={(e)=>setNewRecipe({ ...newRecipe, description:e.currentTarget.value})} 
                        value={newRecipe.description}
                        placeholder={"Enter Recipe Description"}
                        rows={3}
                        />
            </Box>
            <Separator size="4"/>
            <Box >
                <Text as="label"><Strong>Recipe Ingredients</Strong></Text>
            <Box>
                <Card size="4">
                    <Grid gap="3" align="center" columns="1">
                        <Flex gap="3">
                            <Text as="label"><Strong>Ingredient Unit:</Strong></Text>
                            <Select.Root 
                                defaultValue="unit" 
                                name="newRecipeIngredientUnitInputFeild" >
                                <Select.Trigger onChange={(e)=>setnewIngredientUnit({...newIngredientUnit, amount:0, unit:e.currentTarget.value, name:""}) } 
                                />
                                <Select.Content >
                                    <Select.Group>
                                        <Select.Item value="unit" disabled>- Select a Unit of Measurment -</Select.Item>
                                        <Select.Item value="cup">cup</Select.Item>
                                        <Select.Item value="oz" >oz</Select.Item>
                                        <Select.Item value="fl oz">fl oz</Select.Item>
                                        <Select.Item value="tbs" >tbs</Select.Item>
                                        <Select.Item value="tsp" >tsp</Select.Item>
                                    </Select.Group>
                                    <Select.Separator />
                                </Select.Content>
                                </Select.Root>
                        </Flex>
                        <Box>    
                                <Text as="label"><Strong>Amount of Ingredient:</Strong></Text>
                                <TextField.Root
                                    name="newRecipeIngredientsAmountInputFeild"
                                    autoFocus
                                    size="1"
                                    pattern="[0-9]*"
                                    onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value), unit:"", name:""})} 
                                    value={newIngredient.amount} 
                                    placeholder="Enter Amount of Ingredient"
                                />
                        </Box>
                        <Box>   
                                <Text as="label"><Strong>Ingredient:</Strong></Text>
                                <TextField.Root
                                    name="newRecipeIngredientsNameInputFeild"
                                    onChange={(e)=>setnewIngredientName({...newIngredientName, amount:0, unit:"", name:e.currentTarget.value}) }
                                    value={newIngredientName.name} 
                                    placeholder="Enter Ingredient Name"
                                />
                        </Box>
                    </Grid>
                </Card>
            </Box>


                
                
                
            <div> 
                <Button
                    className="ds-u-margin-right--2 ds-u-padding-y--2"
                    onClick={(e)=>setNewRecipe({ ...newRecipe, ingredients:[...newRecipe.ingredients, {amount: Number(newIngredient?.amount), unit:newIngredientUnit.unit, name:newIngredientName?.name}] }) }
                >➕
                </Button> 
                <Text> { "Summary: "} {newIngredient.amount} {", "} {newIngredientUnit.unit} {", "} {newIngredientName.name} </Text>
            </div>
            </Box>


            <Box>
            <Text as="label"><Strong>Ingredients</Strong></Text>
            {ingredientList.map((ingredient)=>{

                console.log( JSON.stringify(ingredient))
                
                return <div key={ingredient.amount+" "+ingredient.unit+" "+ingredient.name}>
                <RenderIngredient ingredient={ingredient} recipe={newRecipe} setRecipe={setNewRecipe}/>
                
                </div>
            })}
            </Box>
            <Separator size="4"/>
            <Box>
                <label className="b"> Steps: </label>
                {/* <input type={"number"} min="0" max="1" onChange={(e)=>setNewStepIndex({...newStepIndex, index:Number(e.currentTarget.value) })} placeholder="Index"/>  */}
                {/* <input onChange={(e)=>setNewStepInstruction({...newStepInstruction, instruction:(e.currentTarget.value)} )} placeholder={"Step"} />*/}
                {/* <button type="button" onClick={(e)=>setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: Number(newStepIndex?.index), instruction:newStepInstruction.instruction}] }) }> Add Step</button>*/}
            </Box>
            <Box>
                {stepsList.map((step)=> {
                    return <div key={step.index+" "+step.instruction}>
                        <RenderStep step={step} recipe={newRecipe} setRecipe={setNewRecipe}/>
                    </div>
                })}
            </Box>
            <Box>
            <Text as="label"><Strong>New Step:</Strong></Text>
            <TextField.Root
                        name="newStepInputFeild"
                        onClick={(e)=> {
                            const newStepIndexVar = stepsList.length??0
                            setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStepInstruction.instruction}] })
                        } }
                        placeholder="Enter New Step Instructions"
                       
                />
                <Button className="ds-u-margin--1 ds-u-padding-y--2" 
                    onClick={(e)=> {
                    const newStepIndexVar = stepsList.length??0
                    setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStepInstruction.instruction}] })
                } }> ➕</Button>
            
            </Box>

            <Button variant="solid" className="ds-u-margin--1" type={"submit"} onClick={(e)=> {
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
        </Grid>

     </>; 
}

export default AddRecipePage; 