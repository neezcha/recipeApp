import React, { EventHandler, MouseEventHandler, useEffect, useState } from "react"
import { menuItem } from "../../types/menuItem"
import EditRecipePage from "../pages/AddRecipePage";
import AllRecipiesPage from "../pages/AllRecipiesPage";
import MealPrepPage from "../pages/MealPrepPage";
import { useAppState } from "../../app-state";

interface IUseDest{
    destination : string;
    menuArr : menuItem[]; 
}

const UseDestionation : React.FC<IUseDest> = ({destination, menuArr}) => {
    const appState = useAppState();

    const [crrPage, setCrrPage]= useState( menuArr.filter((m)=> m.dest === destination)[0]?.dest ?? undefined );
    // const result = menuArr.filter((m)=> m.dest === destination)[0]?.dest ?? undefined

    return <div>
            {crrPage === 'AllRecipiesPage' ? <AllRecipiesPage/> : null}
            {crrPage === 'AddRecipePage' ? <EditRecipePage/> : null}
            {crrPage === 'MealPrepPage' ? <MealPrepPage/> : null}
            
    </div>
}

export default UseDestionation;