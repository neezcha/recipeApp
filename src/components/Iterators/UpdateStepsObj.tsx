import { Step } from "../../types/step"
import { Dispatch, SetStateAction, useState } from "react";
import { Recipe } from "../../types/recipe";

/*************************************
 * Index will be tracked here not by the user
 * 
 *
 * Usage will be implamented in UpdateIngredientList.tsx
        <RenderIngredient/>
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


    return <div>
        {editing === false ? " "+indexVal+" "+instructionVal+" ": null}
        {editing === false ? <button type="button" onClick={()=>{setEditing(!editing)}}> Edit </button> :null}

            
        
    </div>;
}

export default RenderStep;