import { Step } from "../../types/step"
import { Dispatch, SetStateAction, useState } from "react";
import { Recipe } from "../../types/recipe";

/*************************************
 *
 * 
 *
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


    return <div>
        {editing === false ? " "+indexVal+" "+instructionVal+" ": null}
        {editing === false ? <button type="button" onClick={()=>{setEditing(!editing)}}> Edit </button> :null}

        {editing === true ? <div id={'no-uu'}>
            {/*<input type={"number"}  onChange={(e)=>setIndexVal(Number(e.currentTarget.value) ) } value={indexVal} /> */}
            <button onClick={(e)=> {
                 e.preventDefault();
                 setIndexVal(Number(indexVal+1))}}
                 >
                     v
            </button>
            <button onClick={(e)=> {
                 e.preventDefault();
                 setIndexVal(Number(indexVal-1))}}
                 >
                     ^
            </button>
            {" "+indexVal+" "}
            <input onChange={(e)=>setInstructionVal(e.currentTarget.value) } value={instructionVal}/>
            <button type="submit" onClick={()=>{
                setRecipe({...recipe,steps: newStep})
                setEditing(!editing)}}> Save </button>
        </div> : null}   

        {/*addNew === true? <div>
            <button onClick={(e)=> {
                 e.preventDefault();
                 setIndexVal(Number(indexVal+1))}}> up </button>
            <button onClick={(e)=> {
                 e.preventDefault();
                 setIndexVal(Number(indexVal-1))}}> down </button>
            {" "+indexVal+" "}
            <input onChange={(e)=>setInstructionVal(e.currentTarget.value)} placeholder={"Step"} />
            </div>: null */}
        {/*addNew === false? <div>
            <button type="button" onClick={()=>{setAddNew(!addNew)}} > Add Step</button>
        </div>: null */}
        
    </div>;
}

export default RenderStep;