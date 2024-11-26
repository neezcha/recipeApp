import { Recipe } from "../../types/recipe";
import { Ingredient } from "../../types/ingredient"
import { Unit } from "../../types/unit";
import { Console } from "console";
import RecipeItem from "../RecipeItem";
import NavMenu, { navMenuItemArray } from "../Navigation/Menu";
import { Flex, Separator } from "@radix-ui/themes";
import UseDestionation from "../Navigation/UseDest";
import { useState } from "react";

const MainPage : React.FC = () => {


    /************ TO REMOVE: hard coded example recipes */  
    const milk : Ingredient = {
        amount: 1, 
        unit: "cup",
        name: "milk"
    }
    const cereal : Recipe = {
        title: "Simple Cereal",
        description:"",
        ingredients:[
            milk,
            {amount:1, unit:"cup", name:"Cereal"} // inline object creation
        ],
        steps:[
            {index:1, instruction:"Gather ingredients."},
            {index:2, instruction:"Get bowl and a spoon."},
            {index:3, instruction:"Pour cereal into bowl."},
            {index:4, instruction:"Pour Milk into bowl."}
        ] 
    };
    const recipes :Recipe[] = [cereal, {...cereal, title: "Complex Cereal"}];

    /*********** END TO DO  *********************************************/

    const [destination,setDestination] = useState<string>(navMenuItemArray[0].dest);
    
   return <>
        <NavMenu setDestination={setDestination}/>
        <Separator orientation="horizontal" size="4" color="cyan" />
        <Flex as="span" p="5">
            <UseDestionation destination={destination} menuArr={navMenuItemArray}/>
        </Flex>
   </>

}

export default MainPage;
