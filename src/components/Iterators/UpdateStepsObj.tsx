import { Step } from "../../types/step"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import { Button, Card, Flex, TextArea } from "@radix-ui/themes";
import { CrossCircledIcon, ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";

/*************************************
 *  Make each ingrediednt an interactive item 
 * 
 * @param step obj{ index, string }
 * @param recipe current recipe
 * @param setRecipe fn to update current recipe
 *************************************/

interface IUpdateStepObj {
    step : Step;
    recipe: Recipe; 
    setRecipe: Dispatch<SetStateAction<Recipe>> ;
}
const RenderStep : React.FC<IUpdateStepObj>= ({step,recipe,setRecipe}) => {

    const[crrStep, setCrrStep] = useState<Step>(step);
    // index of steps in recipe so far
    const indexStep = recipe.steps.indexOf(step);
    // spread ingridents into an editable array
    const newStep = [...recipe.steps]
    // edit array in place with new values 
    useEffect(()=>{
        newStep.splice(indexStep, 1, {index: crrStep.index, instruction: crrStep.instruction});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[crrStep]);
    useEffect(()=>{
        setRecipe({...recipe, steps:newStep});
    },[newStep]);


    /***
    const [indexVal, setIndexVal] = useState<Step["index"]>(step.index);
    const [instructionVal, setInstructionVal] = useState<Step["instruction"]>(step.instruction);


    // all the steps from the recipe
    const steps = recipe.steps;

    // index of steps in recipe so far
    const indexStep = steps.indexOf(step);
    // spread current steps into an editable array
    const currStep = [...steps]
    // edit array in place with new values 
    currStep.splice(indexStep, 1, {index: indexVal, instruction: instructionVal})
    ***/

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
                        defaultValue={crrStep.instruction}
                        onChange={(e)=>{
                            setCrrStep({...step, instruction: e.currentTarget.value});
                        }}
                    />
                </Flex>
                <Flex justify="end" align={'end'} gap="3" m={'3'} direction={'row'}>
                    <Flex direction={'column'}>
                        <Button 
                            variant={'ghost'} 
                            radius={'full'} 
                            size={'4'}
                            onClick={(e)=> {
                                e.preventDefault();
                                setCrrStep({...step, index: Number(crrStep.index-1)});
                            }}
                        > 
                            <ThickArrowUpIcon /> 
                        </Button>
                        <Button 
                            variant={'ghost'} 
                            radius={'full'} 
                            size={'4'}
                            onClick={(e)=> {
                                e.preventDefault();
                                setCrrStep({...step, index: Number(crrStep.index+1)});
                            }}
                        > 
                            <ThickArrowDownIcon /> 
                        </Button>
                    </Flex>
                    <Button variant={'ghost'} radius={'full'} size={'4'}>
                        <CrossCircledIcon style={{height:'30px'}}/>
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}

export default RenderStep;