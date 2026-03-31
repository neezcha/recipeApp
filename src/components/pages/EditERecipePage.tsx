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
import { AmericanFluidUnitsEnum, AmericanWeightUnitsEnum, blankIngredient, blankRecipe, blankStep, conversionAmericanFluidUnitsToLeter, DropDownSegment, InputSegment, miscUnits, MiscUnitsEnum, QUOTES, usFluidUnits, usWeightUnits } from "../../const";
import { CheckCircledIcon, PlusCircledIcon, CrossCircledIcon, ThickArrowDownIcon, ThickArrowUpIcon, StarIcon, StarFilledIcon, CursorTextIcon } from '@radix-ui/react-icons'
import { UniqueKeyIngredient } from "../../types/uniqueKeys";
import { useParams } from "react-router-dom";

/***
 * TO DO: update to EditRecipePage (empty recipe means new recipe) 
 * @param recipeObj 
 ***/

const EditRecipePage : React.FC = () => {
    const { recipeId } = useParams();

    
    const [editingRecipe, setEditingRecipe] = useState<boolean>(false);
    const [origionalTitle, setOrigionalTitle] = useState<string>("");

    const [crrRecipe, setCrrRecipe] = useState<Recipe>(blankRecipe);
    const [currIngredientList, setCurrIngredientList] = useState<Ingredient[]>([]);
    const [currStepList, setCurrStepsList] = useState<Step[]>([]);

    useEffect(()=>{
        if(recipeId){
            const localRecipe = localStorage.getItem(recipeId);
            console.log(localRecipe);
            if(localRecipe){
                setCrrRecipe( JSON.parse(localRecipe) );
                setEditingRecipe(true);
                setOrigionalTitle(JSON.parse(localRecipe).title);
            }
        }
    },[]);
    useEffect(()=>{
        setCurrIngredientList([...crrRecipe.ingredients]);
        setCurrStepsList([...crrRecipe.steps]);
    },[crrRecipe])

    const [newIngredient, setNewIngredient] = useState<Ingredient>(blankIngredient);
    const [newStep, setNewStep] = useState<Step>(blankStep);

    /****************  to do: 1/20/24
     * bug: cannot go from edit recipe to other pages using nav menu
     * save changes to existing recipe
     * save new ingredient/step to existing recipe
     *****************/

    // to remove 
    const [newRecipe, setNewRecipe] = useState<Recipe>(blankRecipe);
    const crrIngredientList = [...newRecipe.ingredients];
    const [ingredientList, setIngredientList] = useState([...crrIngredientList]);
    const currStepsList = [...newRecipe.steps];
    const [stepList, setStepList] = useState(currStepsList);
    
    /************************************************************************************** 
    const [newRecipe, setNewRecipe] = useState<Recipe>(currRecipe); 
    const [newIngredient, setNewIngredient] = useState<Ingredient>(blankIngredient);
    const [newStep, setNewStep] = useState<Step>(blankStep);
    **************************************************************************************/

    /************************************************************************************** 
    // inferred state
    const crrIngredientList = [...newRecipe.ingredients];
    const [ingredientList, setIngredientList] = useState([...crrIngredientList]);
    const currStepsList = [...newRecipe.steps];
    const [stepList, setStepList] = useState(currStepsList);
    **************************************************************************************/
    
    // sort step list
    useEffect(()=>{
        const tempList = [...stepList]
        tempList.sort((a,b)=>{            
            return a.index - b.index
        })

        if(!isEqual(tempList, stepList)){
            setCrrRecipe({ ...crrRecipe, steps:tempList})
        }
    }, [stepList]);

    // update display components 
    useEffect(()=>{
        setStepList([...crrRecipe.steps]);
        setIngredientList([...crrRecipe.ingredients]);
    },[crrRecipe]);
    
    return (
        <Flex id={'new-recipe-page'} as={"span"} m={'4'}>
            <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'}>
                <Flex gap={'2'} direction={'column'}>
                    <Heading as="h2"> Add Recipe </Heading>
                    <Text size={'2'} weight={'light'} color={'gray'}>
                    {QUOTES.BREAD}
                    </Text>
                </Flex>
                <Flex width={'100%'} py={'5'}>
                    <Separator style={{width: '100%'}}/>
                </Flex>
                <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                    {/*** SECTION Meta ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Heading as="h3"> {crrRecipe.title} </Heading>
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
                                <Text as="label" color={'gray'}><Strong>Recipe Title:</Strong></Text>
                                <TextField.Root
                                    name="crrRecipeTitleInputFeild"
                                    onChange={(e)=>setCrrRecipe({ ...crrRecipe, title:e.currentTarget.value})} 
                                    value={crrRecipe.title}
                                    placeholder={"Enter Recipe Title"}
                                    style={{width: '100%'}}
                                />
                                <Text as="label" color={'gray'}><Strong>Recipe Description:</Strong></Text>
                                <TextArea
                                    name="crrRecipeDescInputFeild"
                                    onChange={(e)=>setCrrRecipe({ ...crrRecipe, description:e.currentTarget.value})} 
                                    value={crrRecipe.description}
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
                            {currIngredientList.map((ingredient, index)=>{
                                return (
                                    <RenderIngredient ingredient={ingredient} recipe={crrRecipe} setRecipe={setCrrRecipe} index={index} key={`${index}-${ingredient.name}`}/>
                                )
                            })}
                            <Card style={{width: '100%', background:'#BBF3FEF7'}}>
                                {/*** TO DO: refactor RenderIngredient to accomidate for new item ***/}
                                <Flex as='span' justify="between" p={'2'}>
                                    <Flex justify="start" gap="3" style={{width: '90%'}}>
                                        <Flex direction={'column'} gap="2">
                                            <Text as="label"><Strong>Quantity:</Strong></Text>
                                            <TextField.Root
                                                name="crrRecipeIngredientsAmountInputFeild"
                                                autoFocus
                                                size="2"
                                                style={{width: '70px'}}
                                                pattern="[0-9]*"
                                                onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value)})} 
                                                value={newIngredient.amount} 
                                                placeholder="Enter Amount of Ingredient"
                                            />
                                        </Flex>
                                        <Flex direction={'column'} gap="2">
                                            <Text as="label"><Strong>Unit:</Strong></Text>
                                            <Select.Root 
                                                defaultValue="unit" 
                                                name="crrRecipeIngredientUnitInputFeild" 
                                                value={newIngredient.unit}
                                                onValueChange={
                                                    (e)=>{
                                                        setNewIngredient({...newIngredient, unit:e});
                                                }}
                                            >
                                                <Select.Trigger />
                                            <Select.Content>
                                                <Select.Item value="unit" disabled>---</Select.Item>
                                                <Select.Group>
                                                    {usFluidUnits.map((unit) => {
                                                        return (
                                                            <Select.Item value={`${unit.value}`} key={`unit-${unit.value}`}>{unit.label.toLowerCase()}</Select.Item>
                                                        )
                                                    })}
                                                </Select.Group>
                                                <Select.Separator />
                                                <Select.Group>
                                                    {usWeightUnits.map((unit, index) => {
                                                        return (
                                                            <Select.Item value={`${unit.value}`} key={`unit-${unit.value}`}>{unit.label.toLowerCase()}</Select.Item>
                                                        )
                                                    })}
                                                </Select.Group>
                                                <Select.Separator />
                                                <Select.Group>
                                                    {miscUnits.map((unit, index) => {
                                                        return (
                                                            <Select.Item value={`${unit.value}`} key={`unit-${unit.value}`}>{unit.label.toLowerCase()}</Select.Item>
                                                        )
                                                    })}
                                                </Select.Group>
                                            </Select.Content>
                                            </Select.Root>
                                        </Flex>
                                        <Flex direction={'column'} gap="2" style={{width: '100%'}}>
                                            <Text as="label"><Strong>Ingredient:</Strong></Text>
                                            <TextField.Root
                                                name="crrRecipeIngredientsNameInputFeild"
                                                onChange={(e)=>setNewIngredient({...newIngredient, name:e.currentTarget.value}) }
                                                value={newIngredient.name} 
                                                placeholder="Enter Ingredient Name"
                                                style={{width: '100%'}}
                                            />
                                        </Flex>
                                    </Flex>
                                    <Flex justify="end" align={'end'} gap="3" m={'3'} direction={'column'}>
                                        <Button 
                                            variant={'ghost'} 
                                            radius={'full'} 
                                            size={'4'}
                                            onClick={()=>{
                                                setCrrRecipe({...crrRecipe, ingredients: [...crrRecipe.ingredients, newIngredient]});
                                                setNewIngredient(blankIngredient);
                                            }}
                                            >
                                            <CheckCircledIcon style={{height:'30px'}}/>
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                    {/*** SECTION Steps ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                            <Heading as="h3"> Instructions </Heading>
                            {currStepList.map((step, index)=> {return (
                                 <RenderStep step={step} recipe={crrRecipe} setRecipe={setCrrRecipe} key={`${step.instruction}`}/>
                       
                            )    
                        })}
                        <Card style={{width: '100%', background:'#BBF3FEF7'}}>
                            {/*** TO DO refactor RenderStep to handle new step ***/}
                            <Flex as='span' justify="between" p={'2'}>
                                <Flex justify="start" gap="3">
                                    {stepList.length}
                                </Flex>
                                <Flex justify="start" gap="3" style={{width: '90%'}}>
                                    <TextArea
                                        name="newStepInputFeild"
                                        autoFocus
                                        size="2"
                                        style={{width: '100%'}}
                                        onChange={(e)=>setNewStep({...newStep, instruction: e.currentTarget.value})}
                                        value={newStep.instruction}
                                        placeholder="Enter New Step Instructions"
                                    />
                                </Flex>
                                <Flex justify="end" align={'end'} gap="3" m={'3'} direction={'row'}>
                                    <Button 
                                        variant={'ghost'} 
                                        radius={'full'} 
                                        size={'4'} 
                                        onClick={(e)=> {
                                            /** TO DO steps validation **/
                                            const newStepIndexVar = stepList.length??0;
                                            setCrrRecipe({ ...crrRecipe, steps:[...crrRecipe.steps, {index: newStepIndexVar, instruction:newStep.instruction??""}] });
                                            setNewStep({...newStep, instruction:""});
                                        }}
                                    >
                                        <CheckCircledIcon style={{height:'30px'}}/>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Card>
                        </Flex>
                    </Flex>
                    {/*** SECTION Ratings ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                            <Heading as="h3"> Ratings </Heading>
                            <Card style={{width: '100%'}}>
                                <Flex as='span' justify="between" p={'2'} width={'100%'}>
                                    {/*** TO DO ratingOptions.map((rating)=>(<></>)) ***/}
                                    <Flex gap={'2'} align={'center'}>
                                        <Text as="label" color="gray"> <Strong>Vibe</Strong></Text>
                                    <Button variant={'soft'}>
                                        <StarFilledIcon/>
                                    </Button>
                                    <Button variant={'soft'}>
                                        <StarFilledIcon/>
                                    </Button>
                                    <Button variant={'soft'}>
                                        <StarFilledIcon/>
                                    </Button>
                                    <Button variant={'soft'}>
                                        <StarIcon/>
                                    </Button>
                                    <Button variant={'soft'}>
                                        <StarIcon/>
                                    </Button>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                    {/*** SECTION actions ***/}
                    <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'} gap={'2'} py={'3'}>
                        <Flex direction={'row'} justify={'start'} align={'start'} width={'100%'} gap={'2'}>
                            <Button
                                type={"submit"}
                                onClick={(e)=> {
                                    e.preventDefault();
                                    console.log(crrRecipe);
                                    console.log(editingRecipe);
                                    console.log(origionalTitle);

                                    editingRecipe ? window.localStorage.setItem(origionalTitle ,JSON.stringify(crrRecipe)) : window.localStorage.setItem(crrRecipe.title, JSON.stringify(crrRecipe) );
                                    setCrrRecipe(blankRecipe)
                                }}
                            > 
                                Save Locally 
                            </Button>
                            <Button
                                variant={'soft'}
                                onClick={()=> setCrrRecipe(blankRecipe) }
                            > 
                                Clear Recipe </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default EditRecipePage; 