import { Ingredient } from "../../types/ingredient"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import { Card, Flex, TextField, Text, Strong, Select, Button } from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";

/*************************************
 * Make each ingrediednt an interactive item 
 * Update Item 
 * Edit Item
 * Display Item 
 * 
 * @param ingredient a step in current recipe that will be rendered
 * @param recipe current recipe
 * @param setRecipe fn to update current recipe
 *************************************/

interface IUpdateIngredientObj {
    ingredient : Ingredient;
    recipe: Recipe; 
    setRecipe: Dispatch<SetStateAction<Recipe>> ;
}
const RenderIngredient : React.FC<IUpdateIngredientObj>= ({ingredient,recipe,setRecipe}) => {
    const [currentIngredient, setCurrentIngredient] = useState<Ingredient>(ingredient);

    // ingredients
    const ingredients = recipe.ingredients
    // index of ingrident
    const indexIngredient = ingredients.indexOf(ingredient)

    // spread ingridents into an editable array
    const newIng = [...ingredients]
    // edit array in place with new values 
    useEffect(()=>{
        newIng.splice(indexIngredient, 1, {amount: currentIngredient.amount, name: currentIngredient.name, unit:currentIngredient.unit})
        setRecipe({...recipe, ingredients:newIng});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentIngredient]);

    return (
        <Card style={{width: '100%'}} key={`ingredient-${ingredient.name}-${ingredient.amount}-${ingredient.unit}`}>
            <Flex as='span' justify="between" p={'2'}>
                <Flex justify="start" gap="3" style={{width: '90%'}}>
                <Flex direction={'column'} gap="2">
                        <Text as="label" color={'gray'}><Strong>Quantity:</Strong></Text>
                        <TextField.Root
                            name="recipeIngredientsAmountInputFeild"
                            autoFocus
                            size="2"
                            style={{width: '70px'}}
                            pattern="[0-9]*"
                            onChange={(e)=>{
                                setCurrentIngredient({...currentIngredient, amount:Number(e.currentTarget.value)});
                            }} 
                            value={currentIngredient.amount} 
                            placeholder={currentIngredient.amount.toString()}
                        />
                    </Flex>
                    <Flex direction={'column'} gap="2">
                        <Text as="label" color={'gray'}><Strong>Unit:</Strong></Text>
                        <Select.Root 
                            defaultValue={currentIngredient.unit} 
                            name="recipeIngredientUnitInputFeild">
                            <Select.Trigger 
                                onChange={(e)=>{
                                    setCurrentIngredient({...currentIngredient, unit:e.currentTarget.value});
                                }} 
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
                            name="recipeIngredientsNameInputFeild"
                            onChange={(e)=>{
                                setCurrentIngredient({...currentIngredient, name:e.currentTarget.value});
                            }}
                            value={currentIngredient.name} 
                            placeholder={currentIngredient.name}
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
                            newIng.splice(indexIngredient, 1);
                            setRecipe({...recipe, ingredients:newIng});
                        }}>
                        <CrossCircledIcon style={{height:'30px'}}/>
                    </Button>
                </Flex>
            </Flex>
        </Card>
    ); 
}

export default RenderIngredient;