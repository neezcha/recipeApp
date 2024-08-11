import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";
import { Step } from "../../types/step"
import { Recipe } from "../../types/recipe";
import RecipeItem from "../RecipeItem";
import RenderIngredient from "../Iterators/UpdateIngredientObj";
import { json } from "stream/consumers";
import RenderStep from "../Iterators/UpdateStepsObj";
import isEqual from "lodash/isEqual";
import { Card, Button, Box, Text, TextField, TextArea, Heading, Flex, Grid, Select, Separator, Strong, Checkbox } from '@radix-ui/themes'
import { DropDownSegment, InputSegment } from "../../const";
import { Pencil2Icon, CheckCircledIcon, PlusCircledIcon, CrossCircledIcon, ThickArrowDownIcon, ThickArrowUpIcon } from '@radix-ui/react-icons'


/***
 * Helper method to render form conrol.  
 * @param appState pointer to global app state
 * @param varName variable name from flow's set-variable section
 * @param spec form control's input type
 * @param variables pointer to the variables state in teh workflow component
 * @param variablesState pointer to the variable validation state in workflow component 
 * @param setVariables pointer to the setter for the variable state 
 * @param setVariablesState pointer to the setVariableStates (validation status) state
 ***/
export interface IRenderContolerProps{
    appState: any; /** TO DO make appSate and specify type here */
    varName: string;
    spec: InputSegment | DropDownSegment;
    variables: any
    variablesState: any;
    setVariables: (variables: any) => void;
    setVariablesStatus: (variablesStae: any) => void;
}
export const rederControler: React.FC<IRenderContolerProps>  = (
 {  appState,
    varName,
    spec,
    variables,
    variablesState,
    setVariables,
    setVariablesStatus,
}) => {
    if(!spec) return null;
    spec = spec as any; 

    switch(spec.type){
        case 'dropdown':
            return(
                <Select.Root
                    defaultValue={spec.defaultValue}
                    onValueChange={(val) =>{
                        setVariables({...variables, [varName]: val});
                        if(spec.validation && spec.validation instanceof RegExp){
                            setVariablesStatus({
                                ...variablesState,
                                [varName]: val.match(spec.validation),
                            });
                        } else if(spec.validation && typeof spec.validation === 'function'){
                            setVariablesStatus({
                                ...variablesState,
                                [varName]: Boolean(spec.validation(val)),
                            });
                        }
                    }}   
                >
                    <Select.Trigger id={`dropdonw-${varName}`} placeholder={spec.placeholder}/>
                    <Select.Content>
                        {/** TO DO:  appState? or render from static set of choices given**/}
                        {/***
                            spec.dataSource 
                            ? appState.[spec.dataSource]?.map((item: any, index: number) => (
                                <Select.Item key={`${item}-${index}`} id={item} value={item}>
                                    {item}
                                </Select.Item>

                            )) 
                            : spec.choices?.map((item: any, index: number) => (
                                <Select.Item key={`${item}-${index}`} id={item} value={item}>
                                    {item}
                                </Select.Item>
                            ))
                        ***/}
                        {
                        spec.choices?.map((item, index) => (
                            <Select.Item key={`${item}-${index}`} id={item} value={item}>
                                {item}
                            </Select.Item>)
                        )}
                    </Select.Content>
                </Select.Root>

            );    
        case 'boolean':
            return(
                <Checkbox
                    id={`input-${varName}`}
                    value={variables[varName]}
                    disabled={spec.disabled}
                    onCheckedChange={(e: boolean)=>{ setVariables({...variables, [varName]: e}) }}
                />
            );   
        case 'number':
            return (
                <TextField.Root
                id={`input-${varName}`}
                type={spec.type}
                placeholder={spec.placeholder}
                value={variables.varName}
                disabled={spec.disabled}
                onChange={(e)=>{
                    setVariables({...variables, [varName]: e.target.value});
                    if(spec.validation && spec.validation instanceof RegExp){
                        setVariablesStatus({
                            ...variablesState,
                            [varName]: e.target.value.match(spec.validation),
                        });
                    } else if(spec.validation && typeof spec.validation === 'function') {
                        setVariablesStatus({
                            ...variablesState,
                            [varName]: Boolean(spec.validation(e.target.value)),
                        });
                    }
                }}
            ></TextField.Root>)
        case 'string':
            return(
                <TextField.Root
                    id={`input-${varName}`}
                    placeholder={spec.placeholder}
                    value={variables.varName}
                    disabled={spec.disabled}
                    onChange={(e)=>{
                        setVariables({...variables, [varName]: e.target.value});
                        if(spec.validation && spec.validation instanceof RegExp){
                            setVariablesStatus({
                                ...variablesState,
                                [varName]: e.target.value.match(spec.validation),
                            });
                        } else if(spec.validation && typeof spec.validation === 'function') {
                            setVariablesStatus({
                                ...variablesState,
                                [varName]: Boolean(spec.validation(e.target.value)),
                            });
                        }
                    }}
                ></TextField.Root>
            );
    }
};

/***
 * TO DO: update to EditRecipePage (empty recipe means new recipe) 
 * @param recipeObj 
 ***/
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

    return (
        <Flex id={'new-recipe-page'} as={"span"} m={'4'}>
            <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'}>
                <Flex gap={'2'} direction={'column'}>
                    <Heading as="h2"> Add Recipe! </Heading>
                    <Text size={'2'} weight={'light'} color={'gray'}>
                    All bread is made of wood, / cow dung, packed brown moss, / the bodies of dead animals, the teeth / and backbones, what is left / after the ravens. This dirt / flows through the stems into the grain, / into the arm, nine strokes / of the axe, skin from a tree, / good water which is the first / gift, four hours. //    / Live burial under a moist cloth, / a silver dish, the row / of white famine bellies / swollen and taut in the oven, / lungfuls of warm breath stopped / in the heat from an old sun. //   / Good bread has the salt taste / of your hands after nine / strokes of the axe, the salt / taste of your mouth, it smells / of its own small death, of the deaths / before and after. //   / Lift these ashes / into your mouth, your blood; / to know what you devour / is to consecrate it, / almost. All bread must be broken / so it can be shared. Together / we eat this earth. // 
                    </Text>
                </Flex>
                <Flex width={'100%'} py={'5'}>
                    <Separator style={{width: '100%'}}/>
                </Flex>
                <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                    {/*** SECTION Meta ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Heading as="h3"> {newRecipe.title} </Heading>
                        <Card style={{width: '100%'}}>
                            <Flex 
                                direction={'column'}
                                gap={'2'}
                                flexShrink={'0'}
                                flexGrow={'1'}
                                justify={'center'}
                                align={'start'}
                                width={'100%'}
                                p={'2'}
                            >
                                <Text as="label" color={'gray'}><Strong>RecipeTitle:</Strong></Text>
                                <TextField.Root
                                    name="newRecipeTitleInputFeild"
                                    onChange={(e)=>setNewRecipe({ ...newRecipe, title:e.currentTarget.value})} 
                                    value={newRecipe.title}
                                    placeholder={"Enter Recipe Title"}
                                    style={{width: '100%'}}
                                />
                                <Text as="label" color={'gray'}><Strong>Recipe Description:</Strong></Text>
                                <TextArea
                                    name="newRecipeDescInputFeild"
                                    onChange={(e)=>setNewRecipe({ ...newRecipe, description:e.currentTarget.value})} 
                                    value={newRecipe.description}
                                    placeholder={"Enter Recipe Description"}
                                    rows={3}
                                    style={{width: '100%'}}
                                />
                            </Flex>
                        </Card>
                    </Flex>
                    {/*** SECTION Ingredients ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                            <Heading as="h3"> Ingredients </Heading>
                            {/************ ingredients.map((ingredient, index) => (<Card></Card>)) ***********/}
                            {ingredientList.map((ingredient)=>{
                                console.log( JSON.stringify(ingredient) );
                                console.log( ingredient.amount+" "+ingredient.unit+" "+ingredient.name );
                                console.log( "<RenderIngredient ingredient={ingredient} recipe={newRecipe} setRecipe={setNewRecipe}/>" );

                                return (
                                    <Card style={{width: '100%'}}>
                                        <Flex as='span' justify="between" p={'2'}>
                                            <Flex justify="start" gap="3" style={{width: '90%'}}>
                                            <Flex direction={'column'} gap="2">
                                                    <Text as="label" color={'gray'}><Strong>Quantity:</Strong></Text>
                                                    <TextField.Root
                                                        name="newRecipeIngredientsAmountInputFeild"
                                                        autoFocus
                                                        size="2"
                                                        style={{width: '70px'}}
                                                        pattern="[0-9]*"
                                                        onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value), unit:"", name:""})} 
                                                        value={ingredient.amount} 
                                                        placeholder={ingredient.amount.toString()}
                                                    />
                                                </Flex>
                                                <Flex direction={'column'} gap="2">
                                                    <Text as="label" color={'gray'}><Strong>Unit:</Strong></Text>
                                                    <Select.Root 
                                                    defaultValue={ingredient.unit} 
                                                    name="newRecipeIngredientUnitInputFeild" >
                                                    <Select.Trigger onChange={(e)=>setnewIngredientUnit({...newIngredientUnit, amount:0, unit:e.currentTarget.value, name:""}) } 
                                                    />
                                                    <Select.Content>
                                                        <Select.Group>
                                                            {/*** TO DO units.map((unit)=>(<Select.Item value={`unit-${unit}`}>{unit}</Select.Item>)) ***/}
                                                            <Select.Item value="unit" disabled>---</Select.Item>
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
                                                <Flex direction={'column'} gap="2" style={{width: '100%'}}>
                                                    <Text as="label" color={'gray'}><Strong>Ingredient:</Strong></Text>
                                                    <TextField.Root
                                                        name="newRecipeIngredientsNameInputFeild"
                                                        onChange={(e)=>setnewIngredientName({...newIngredientName, amount:0, unit:"", name:e.currentTarget.value}) }
                                                        value={ingredient.name} 
                                                        placeholder={ingredient.name}
                                                        style={{width: '100%'}}
                                                    />
                                                </Flex>
                                            </Flex>
                                            <Flex justify="end" align={'end'} gap="3" m={'3'} direction={'column'}>
                                                {/*** TO DO ingredient.editing ? (<Button variant={'ghost'} radius={'full'} size={'4'}> <CrossCircledIcon style={{height:'30px'}}/> Delete </Button>): null ***/}
                                                <Button variant={'ghost'} radius={'full'} size={'4'}>
                                                    <CrossCircledIcon style={{height:'30px'}}/>
                                                    {/*** TO DO ingredient.editing ? <CheckCircledIcon style={{height:'30px'}}/> : </Pencil2Icon style={{height:'30px'}}/> ***/}
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                )
                            })}
                            <Card style={{width: '100%', background:'#BBF3FEF7'}}>
                                <Flex as='span' justify="between" p={'2'}>
                                    <Flex justify="start" gap="3" style={{width: '90%'}}>
                                        <Flex direction={'column'} gap="2">
                                            <Text as="label"><Strong>Quantity:</Strong></Text>
                                            <TextField.Root
                                                name="newRecipeIngredientsAmountInputFeild"
                                                autoFocus
                                                size="2"
                                                style={{width: '70px'}}
                                                pattern="[0-9]*"
                                                onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value), unit:"", name:""})} 
                                                value={newIngredient.amount} 
                                                placeholder="Enter Amount of Ingredient"
                                            />
                                        </Flex>
                                        <Flex direction={'column'} gap="2">
                                            <Text as="label"><Strong>Unit:</Strong></Text>
                                            <Select.Root 
                                            defaultValue="unit" 
                                            name="newRecipeIngredientUnitInputFeild" >
                                            <Select.Trigger onChange={(e)=>setnewIngredientUnit({...newIngredientUnit, amount:0, unit:e.currentTarget.value, name:""}) } 
                                            />
                                            <Select.Content >
                                                <Select.Group>
                                                    {/*** TO DO units.map((unit)=>(<Select.Item value={`unit-${unit}`}>{unit}</Select.Item>)) ***/}
                                                    <Select.Item value="unit" disabled>---</Select.Item>
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
                                        <Flex direction={'column'} gap="2" style={{width: '100%'}}>
                                            <Text as="label"><Strong>Ingredient:</Strong></Text>
                                            <TextField.Root
                                                name="newRecipeIngredientsNameInputFeild"
                                                onChange={(e)=>setnewIngredientName({...newIngredientName, amount:0, unit:"", name:e.currentTarget.value}) }
                                                value={newIngredientName.name} 
                                                placeholder="Enter Ingredient Name"
                                                style={{width: '100%'}}
                                            />
                                        </Flex>
                                    </Flex>
                                    <Flex justify="end" align={'end'} gap="3" m={'3'} direction={'column'}>
                                        {/*** TO DO ingredient.editing ? (<Button variant={'ghost'} radius={'full'} size={'4'}> <CrossCircledIcon style={{height:'30px'}}/> Delete </Button>): null ***/}
                                        <Button variant={'ghost'} radius={'full'} size={'4'}>
                                            <CheckCircledIcon style={{height:'30px'}}/>
                                            {/*** TO DO ingredient.editing ? <CheckCircledIcon style={{height:'30px'}}/> : </Pencil2Icon style={{height:'30px'}}/> ***/}
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Card>
                            <Flex p={'2'} mx={'2'}>
                                <Button variant={'soft'}>
                                    <PlusCircledIcon style={{height:'30px'}}/>
                                    <Text>{" "}Add Ingredient</Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/*** SECTION Steps ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                            <Heading as="h3"> Instructions </Heading>
                            {stepsList.map((step)=> {
                                console.log(step.index+" "+step.instruction);
                                console.log("<RenderStep step={step} recipe={newRecipe} setRecipe={setNewRecipe}/>");
                            return (
                                <Card style={{width: '100%'}}>
                                <Flex as='span' justify="between" p={'2'}>
                                    <Flex justify="start" gap="3">
                                        {step.index}
                                    </Flex>
                                    <Flex justify="start" gap="3" style={{width: '90%'}}>
                                        <TextArea
                                            name="newRecipeIngredientsAmountInputFeild"
                                            autoFocus
                                            size="2"
                                            style={{width: '100%'}}
                                            onClick={(e)=> {
                                                const newStepIndexVar = stepsList.length??0
                                                setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStepInstruction.instruction}] })
                                            } }
                                            value={step.instruction} 
                                            placeholder={step.instruction}
                                        />
                                    </Flex>
                                    <Flex justify="end" align={'end'} gap="3" m={'3'} direction={'row'}>
                                        <Flex direction={'column'}>
                                            <Button variant={'ghost'} radius={'full'} size={'4'}> 
                                                <ThickArrowUpIcon /> 
                                            </Button>
                                            <Button variant={'ghost'} radius={'full'} size={'4'}> 
                                                <ThickArrowDownIcon /> 
                                            </Button>
                                        </Flex>
                                        <Button variant={'ghost'} radius={'full'} size={'4'}>
                                            <CrossCircledIcon style={{height:'30px'}}/>
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Card>)
                        })}
                        <Flex p={'2'} mx={'2'}>
                                <Button variant={'soft'}>
                                    <PlusCircledIcon style={{height:'30px'}}/>
                                    <Text>{" "}Add Step</Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>

                    
                </Flex>
                {/******* OLD BELOW ********/}
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
                        >➕p
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
            </Flex>
        </Flex>
    );
}

export default AddRecipePage; 