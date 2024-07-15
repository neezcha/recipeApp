import React, { EventHandler, MouseEventHandler, useEffect, useState } from "react"
import { menuItem } from "../types/menuItem"
import UseDestionation from "./Navigation/UseDest"
import AllRecipiesPage from "./pages/AllRecipiesPage"
import { Button, Checkbox, Heading, Flex, Separator, Switch } from '@radix-ui/themes'

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
    
    const [destination,setDestination] = useState<string>("");
    
    return <>
        <div id="navMENU">
            <Flex as="span" align="center" justify="between" gap="4" px="3">
                <Flex justify="start" gap="3">
                    <Heading as="h1" color="cyan">The Menu </Heading>
                </Flex>
                <Flex justify="center" gap="3">
                    {menuItemsArr.map(element =>{
                        return<>
                        <Button 
                            className="pointer mr4" 
                            color="cyan"
                            variant="surface"
                            onClick={()=> setDestination(element.dest)} 
                            key={element.title}>
                        {element.title} 
                        </Button>
                    </>})}
                </Flex>
                <Flex justify="end" gap="3"> 
                    <Checkbox defaultChecked />
                    <Switch defaultChecked />
                </Flex>
            </Flex>
        </div>          
        <Separator orientation="horizontal" size="4" color="cyan" />
        <Flex as="div" p="3">
            <UseDestionation destination={destination} menuArr={menuItemsArr}/>
        </Flex>
    </>;
}


export default NavMenu;