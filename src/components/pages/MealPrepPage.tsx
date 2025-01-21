import { Recipe } from "../../types/recipe";
import {Box, Flex, Heading} from "@radix-ui/themes";


interface IMealPrepPage{
}

const MealPrepPage : React.FC = () => {

    return (
    <Box id={'meal-prep-page'} m={'4'}>
        <Flex direction={'column'} justify={'start'} align={'start'}>
            <Heading as="h2">Meal Prep!</Heading>
        </Flex>
    </Box>
    ); 
}

export default MealPrepPage; 