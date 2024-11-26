import { Card, Flex, Text, Strong, Heading, Separator } from "@radix-ui/themes";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { Step } from "../../types/step";
import { Ingredient } from "../../types/ingredient";

/*************************************
 * View Only Recipe  
 * 
 * @param recipe JSON string of current recipe
 *************************************/
interface IRenderRecipeObj {
    recipe: string;
}

const RenderRecipe : React.FC<IRenderRecipeObj>= ({recipe}) => {
    const recipeJson = JSON.parse(recipe);
    const ingArr : Ingredient[] = recipeJson.ingredients;
    const stepArr : Step [] = recipeJson.steps;

    console.log(typeof ingArr);
    console.log(ingArr);

    return(
        <Card style={{width:'100%', backgroundColor: 'var(--gray-5)'}}>
            <Flex direction="column" justify="between" p={'2'}>
                <Flex justify="start" gap="3" direction={'column'}>
                        <Heading as="h3" size="4">{recipeJson.title}</Heading>
                        <Text color="gray">{recipeJson.description}</Text>
                </Flex>
                <Separator style={{width: '100%', marginBottom:'1rem', marginTop:'1rem'}}/>
                <Flex justify="start" gap="3" direction={'column'} pl={'4'}>
                    {ingArr?.map(({ amount, unit, name })=>{
                        return(<div  key={amount+unit+name}>
                            <Text key={recipeJson.title+amount+unit} color={"gray"} style={{paddingRight: '1.5rem'}}><Strong>{amount}{unit}</Strong></Text>
                            <Text key={recipeJson.title+name}>{name}</Text>
                        </div>)
                    })}
                </Flex>
                <Separator style={{width: '100%', marginBottom:'1rem', marginTop:'1rem'}}/>
                <Flex justify="start" gap="3" direction={'column'} pl={'4'}>
                    {stepArr?.map(({ index, instruction })=>{
                        return(<div  key={instruction+index}>
                            <Text key={recipeJson.title+index} color={"gray"} style={{paddingRight: '1.5rem'}}><Strong>{index}</Strong></Text>
                            <Text key={recipeJson.title+instruction}>{instruction}</Text>
                        </div>)
                    })}
                </Flex>
                
            </Flex>  
        </Card>
    );

}

export default RenderRecipe;
