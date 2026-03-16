import { Recipe } from "../../types/recipe";
import { Ingredient } from "../../types/ingredient"
import { Unit } from "../../types/unit";
import { Console } from "console";
import RecipeItem from "../RecipeItem";
import NavMenu from "../Navigation/Menu";
import { Box, Flex, Separator } from "@radix-ui/themes";
import UseDestionation from "../Navigation/UseDest";
import { useEffect, useState } from "react";
import { useAppState } from "../../app-state";
import { navMenuItemArray } from "../../const";

const MainPage : React.FC = () => {
    const appState = useAppState();

    
   return <>

   </>

}

export default MainPage;
