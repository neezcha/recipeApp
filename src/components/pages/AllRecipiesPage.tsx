import { Recipe } from "../../types/recipe";
import {Box, Heading, Text, TextField, Strong} from '@radix-ui/themes';


interface IAllRecipiesPage {
}


const AllRecipiesPage : React.FC = () => {
    return <>
        <Heading as="h2">All Recipies!</Heading>
        <Box style={{width:'900px'}}>
                <Text as="label"><Strong>RecipeTitle:</Strong></Text>
                <TextField.Root
                        name="abc"
                        />
            </Box>
     </>; 
}

export default AllRecipiesPage; 