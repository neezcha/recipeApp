import { useEffect, useState } from "react";
import { QUOTES } from "../../const";
import { Recipe } from "../../types/recipe";
import {Box, Card, Heading, Text, TextField, Strong, Flex, Separator} from '@radix-ui/themes';
import RenderRecipe from "../Iterators/RenderRecipe";

interface IAllRecipiesPage {
}

const AllRecipiesPage : React.FC = () => {

    const getLocal = () =>{
        const values = [];
        const keys = Object.keys(localStorage);
        let i = keys.length;
        while ( i-- ) {
            const obj = localStorage.getItem(keys[i]) ?? "";
            values.push(obj);
        }
        return values;
        
    };
    let gotLocal = getLocal();
    let localLen = gotLocal.length > 0 ;


    return (
        <Box id={'new-recipe-page'} m={'4'}>
            <Flex direction={'column'} justify={'start'} align={'start'}>
                <Flex gap={'2'} direction={'column'}>
                    <Heading as="h2"> Add Recipe! </Heading>
                    <Text size={'2'} weight={'light'} color={'gray'}>
                    {QUOTES.BALANCED}
                    </Text>
                </Flex>
                <Flex width={'100%'} py={'5'}>
                    <Separator style={{width: '100%'}}/>
                </Flex>
                <Flex direction={'column'} justify={'start'} align={'start'} gap={'4'}>
                    {gotLocal.length > 0 ? 
                        gotLocal.map((recipeString)=>{
                            return(
                            <RenderRecipe recipe={recipeString} key={recipeString}/>);
                        })
                    : <Box px={'5'}>
                        <Text size={'4'} weight={'bold'} color={'gray'}>
                            No Recipies... yet
                        </Text>
                      </Box>
                    }
                </Flex>
            </Flex>
        </Box>    
    ); 
}

export default AllRecipiesPage; 