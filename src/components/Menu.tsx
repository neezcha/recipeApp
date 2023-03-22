import { Button, VerticalNav } from "@cmsgov/design-system"
import React, { EventHandler, MouseEventHandler, useEffect, useState } from "react"
import { menuItem } from "../types/menuItem"
import UseDestionation from "./Navigation/UseDest"
import AllRecipiesPage from "./pages/AllRecipiesPage"

interface IMenu{
    menuItem: menuItem
}

const NavMenu : React.FC = () => {
    const allRecipies : menuItem = {
        title : "All Recipies",
        dest : "AllRecipiesPage"
    }
    const addRecipies : menuItem = {
        title : "Add a Recipe",
        dest : "AddRecipePage"
    }
    const mealPrep : menuItem = {
        title : "Meal Prep",
        dest : "MealPrepPage"
    }
    const menuItemsArr :menuItem[] = [allRecipies, addRecipies, mealPrep];
    
    const [destination,setDestination] = useState<string>("")

        
    
    return <div>
        <div className="ds-u-padding--2 ds-u-padding-bottom--2 ds-u-fill--background-inverse">
            <h2 className="ds-u-color--white" id="navMENU">
                {"MENU"}  
            </h2>          
            <div className="flex">
            {menuItemsArr.map(element =>{
                return<Button onDark variation="solid" className="pointer mr4" onClick={()=> setDestination(element.dest)} key={element.title}>
                    {element.title} 
                </Button>
            })}
            </div>
        </div>
        <hr/>
        <div className="ds-u-margin--1">
            <UseDestionation destination={destination} menuArr={menuItemsArr}/>
            {/* {destination === 'mainPage.tsx' ? <AllRecipiesPage/> : null} */}
            {/* {destination === 'tbd...' ? <>tbd...</> : null} */}
            {/* {destination === 'tbd' ? <>hi</> : null} */}
        </div>
    </div>;
}


export default NavMenu;