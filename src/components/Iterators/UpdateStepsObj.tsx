import { Step } from "../../types/step"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import { isEqual } from "lodash";
import { Button, TextField } from "@cmsgov/design-system";

/*************************************
 * Usage will be implamented in UpdateStepsObj.tsx
        <RenderStep/>
 *
 *************************************/

interface IUpdateStepObj {
    step : Step;
    recipe: Recipe; 
    setRecipe: Dispatch<SetStateAction<Recipe>> ;
}
const RenderStep : React.FC<IUpdateStepObj>= ({step,recipe,setRecipe}) => {

    const [editing,setEditing] = useState(false);
    const [indexVal, setIndexVal] = useState<Step["index"]>(step.index);
    const [instructionVal, setInstructionVal] = useState<Step["instruction"]>(step.instruction);

    // all the steps from the recipe
    const steps = recipe.steps
    // index of steps in recipe so far
    const indexStep = steps.indexOf(step)

    // spread current steps into an editable array
    const newStep = [...steps]
    // edit array in place with new values 
    newStep.splice(indexStep, 1, {index: indexVal, instruction: instructionVal})
    //max steps
    const stepMaxIndexs = recipe.steps.length 

    return <div>     
        {editing === false ? <Button className="ds-u-margin--1 ds-u-padding-y--2" onClick={()=>{setEditing(!editing)}}> 📝 </Button> :null}
        {editing === false ? " "+indexVal+" "+instructionVal+" ": null}

        {editing === true ? <div id={'no-uu'}>
            <Button className="ds-u-margin--1 ds-u-padding-y--2"
            onClick={(e)=> {
                 e.preventDefault();
                 var updateVal =indexVal+1; 
                 if(stepMaxIndexs < indexVal+1){updateVal=indexVal;}
                 setIndexVal(Number(updateVal))}}
                 >
                     ⬇
            </Button>
            <Button className="ds-u-margin--1 ds-u-padding-y--2"
            onClick={(e)=> {
                 e.preventDefault();
                 setIndexVal(Number(indexVal-1))}}
                 >
                     ⬆
            </Button>
            {" "+indexVal+" "}
            <TextField
                        label=""
                        name={"editStepInputFeild"+indexVal}
                        value={instructionVal}
                        multiline
                        rows={3}
                />          
            <Button className="ds-u-margin--1 ds-u-padding-y--2" 
                onClick={()=>{
                setRecipe({...recipe,steps: newStep})
                setEditing(!editing)}}> ✔ </Button>
        </div> : null}           
    </div>;
}

export default RenderStep;