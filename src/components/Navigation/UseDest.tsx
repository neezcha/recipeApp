import React, { EventHandler, MouseEventHandler, useEffect, useState } from "react"
import { menuItem } from "../../types/menuItem"
import EditRecipePage from "../pages/AddRecipePage";
import AllRecipiesPage from "../pages/AllRecipiesPage";
import MealPrepPage from "../pages/MealPrepPage";

interface IUseDest{
    destination : string;
    menuArr : menuItem[]; 
}

const UseDestionation : React.FC<IUseDest> = ({destination, menuArr}) => {

    const result = menuArr.filter((m)=> m.dest === destination)[0]?.dest ?? undefined

    return <div>
            {result === 'AllRecipiesPage' ? <AllRecipiesPage/> : null}
            {result === 'AddRecipePage' ? <EditRecipePage/> : null}
            {result === 'MealPrepPage' ? <MealPrepPage/> : null}
            
    </div>
}

export default UseDestionation;