import { Ingredient } from "../../types/ingredient"
import { useEffect, useState } from "react";

/*************************************
 * Similar to a To Do list: add, update, itterate to display
 *  Update Item 
 *  Edit Item
 *  Display Item 
 * 
 *
 * Usage will be implamented in UpdateIngredientList.tsx
        <RenderIngredient/>
 *
 *************************************/

interface IUpdateIngredientObj {
    ingredient : Ingredient;

}

const RenderIngredient : React.FC<IUpdateIngredientObj>= ({ingredient}) => {

    const [editing,setEditing] = useState(false);
    const [amountVal, setAmountVal] = useState<Ingredient["amount"]>(ingredient.amount);
    const [unitVal, setUnitVal] = useState<Ingredient["unit"]>(ingredient.unit);
    const [nameVal, setNameVal] = useState<Ingredient["name"]>(ingredient.name);


    return <div className="mr5">
        
        {/* {" "+ingredient.amount +" "+ ingredient.name +" "+ ingredient.unit+"   "} */}
        {/*" "+amountVal+" "+unitVal+" "+nameVal+" "*/} 

        {/* <input type={"number"} onChange={(e)=>setAmountVal(100) }/> 
        <input onChange={(e)=>setUnitVal(e.currentTarget.value) }/>
        <input onChange={(e)=>setNameVal(e.currentTarget.value) }/>
         */}
        {editing === false ? " "+amountVal+" "+unitVal+" "+nameVal+" " : null}
        {editing === false ? <button type="button" onClick={()=>{setEditing(!editing)}}> Edit </button> :null}

        {editing === true ? <div>
            <input type={"number"} onChange={(e)=>setAmountVal(Number(e.currentTarget.value) ) } value={amountVal} /> 
            <input onChange={(e)=>setUnitVal(e.currentTarget.value) } placeholder={unitVal}/>
            <input onChange={(e)=>setNameVal(e.currentTarget.value) } placeholder={nameVal}/>
            <button type="button" onClick={()=>{setEditing(!editing)}}> Save </button>
        </div> : null} 

    
        

        
    </div>; 
}

export default RenderIngredient;