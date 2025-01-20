import { Recipe } from "../../types/recipe";
import { Ingredient } from "../../types/ingredient"
import { Unit } from "../../types/unit";
import { Console } from "console";
import RecipeItem from "../RecipeItem";
import NavMenu, { navMenuItemArray } from "../Navigation/Menu";
import { Box, Flex, Separator } from "@radix-ui/themes";
import UseDestionation from "../Navigation/UseDest";
import { useEffect, useState } from "react";
import { useAppState } from "../../app-state";

const MainPage : React.FC = () => {
    const appState = useAppState();

    // const [destination,setDestination] = useState<string>(navMenuItemArray[0].dest);
    const [destination,setDestination] = useState<string>(navMenuItemArray[0].dest);
    useEffect(()=>{
        appState.setPageDest(destination);
    },[destination]);
    
   return <>
        <NavMenu setDestination={setDestination}/>
        <Separator orientation="horizontal" size="4" color="cyan" />
        <Box p="5" width={'100%'}>
            <UseDestionation destination={destination} menuArr={navMenuItemArray}/>
        </Box>
   </>

}

export default MainPage;
