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
import { AmericanFluidUnitsEnum, AmericanWeightUnitsEnum, conversionAmericanFluidUnitsToLeter, DropDownSegment, InputSegment, miscUnits, MiscUnitsEnum, QUOTES, usFluidUnits, usWeightUnits } from "../../const";
import { CheckCircledIcon, PlusCircledIcon, CrossCircledIcon, ThickArrowDownIcon, ThickArrowUpIcon, StarIcon, StarFilledIcon, CursorTextIcon } from '@radix-ui/react-icons'
import { UniqueKeyIngredient } from "../../types/uniqueKeys";

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
        steps: []
    };
    const blankIngredient : Ingredient = {
        amount: 0,
        unit: "unit",
        name: ""
    };
    const blankStep : Step = {
        index : 0,
        instruction : "" 
    };
    
    const [newRecipe, setNewRecipe] = useState<Recipe>(blankRecipe); 
    const [newIngredient, setNewIngredient] = useState<Ingredient>(blankIngredient);
    const [newStep, setNewStep] = useState<Step>(blankStep);

    // inferred state
    const crrIngredientList = [...newRecipe.ingredients];
    const [ingredientList, setIngredientList] = useState([...crrIngredientList]);
    const currStepsList = [...newRecipe.steps];
    const [stepList, setStepList] = useState(currStepsList);
    
    // sort step list
    useEffect(()=>{
        const tempList = [...stepList]
        tempList.sort((a,b)=>{            
            return a.index - b.index
        })

        if(!isEqual(tempList, stepList)){
            setNewRecipe({ ...newRecipe, steps:tempList})
        }
    }, [stepList]);

    // update display components 
    useEffect(()=>{
        setStepList([...newRecipe.steps]);
        setIngredientList([...newRecipe.ingredients]);
    },[newRecipe]);

    return (
        <Flex id={'new-recipe-page'} as={"span"} m={'4'}>
            <Flex direction={'column'} justify={'start'} align={'start'} width={'100%'}>
                <Flex gap={'2'} direction={'column'}>
                    <Heading as="h2"> Add Recipe! </Heading>
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
                            {ingredientList.map((ingredient, index)=>{
                                return (
                                    <RenderIngredient ingredient={ingredient} recipe={newRecipe} setRecipe={setNewRecipe} index={index} key={`${index}-${ingredient.name}`}/>
                                )
                            })}
                            <Card style={{width: '100%', background:'#BBF3FEF7'}}>
                                {/*** TO DO: refactor RenderIngredient to accomidate for new item ***/}
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
                                                onChange={(e)=>setNewIngredient({...newIngredient, amount:Number(e.currentTarget.value)})} 
                                                value={newIngredient.amount} 
                                                placeholder="Enter Amount of Ingredient"
                                            />
                                        </Flex>
                                        <Flex direction={'column'} gap="2">
                                            <Text as="label"><Strong>Unit:</Strong></Text>
                                            <Select.Root 
                                                defaultValue="unit" 
                                                name="newRecipeIngredientUnitInputFeild" 
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
                                                name="newRecipeIngredientsNameInputFeild"
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
                                                setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, newIngredient]});
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
                            {stepList.map((step, index)=> {return (
                                 <RenderStep step={step} recipe={newRecipe} setRecipe={setNewRecipe} key={`${step.instruction}`}/>
                       
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
                                            setNewRecipe({ ...newRecipe, steps:[...newRecipe.steps, {index: newStepIndexVar, instruction:newStep.instruction??""}] });
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
                                    console.log(newRecipe);
                                    window.localStorage.setItem( newRecipe.title ,JSON.stringify(newRecipe) );
                                }}
                            > 
                                Save Locally 
                            </Button>
                            <Button
                                variant={'soft'}
                                onClick={()=> setNewRecipe(blankRecipe) }
                            > 
                                Clear Recipe </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default AddRecipePage; 