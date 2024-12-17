import { Card, Flex, Text, Strong, Heading, Separator, Box, Grid, Button, DropdownMenu } from "@radix-ui/themes";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { Step } from "../../types/step";
import { Ingredient } from "../../types/ingredient";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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

    const title = recipeJson.title === "" ? "No Title" : recipeJson.title

    return(
        <Card style={{width:'100%', backgroundColor: 'var(--gray-5)'}}>
            <Flex direction="column" justify="between" p={'2'}>
                <Flex justify="end" gap="1" direction="row" style={{justifyContent:'space-between'}}> 
                    <Flex justify="start" gap="1" direction={'column'}>
                            <Heading as="h3" size="4">{title}</Heading>
                            <Text size='2' color="gray">{recipeJson.description}</Text>
                    </Flex>
                    <Flex>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button color="gray" variant="soft"> 
                                    <DotsHorizontalIcon/>
                                </Button>
                            </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item className="DropdownMenuItem" disabled>
                                        Print
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className="DropdownMenuItem" disabled>
                                        Edit
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className="DropdownMenuItem" onClick={()=>{localStorage.removeItem(recipeJson.title)}}>
                                        Delete 
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>
                </Flex>
                <Separator style={{width: '100%', marginBottom:'1rem', marginTop:'1rem'}}/>
                <Flex justify="start" gap="3" direction={'column'} pl={'4'}>
                    {ingArr.length > 0 ?
                        ingArr?.map(({ amount, unit, name })=>{
                            return(<div  key={amount+unit+name}>
                                <Grid columns={'20% auto'} justify='start' >
                                    <Flex>
                                        <Text key={title+amount+unit} color={"gray"} style={{paddingRight: '1.5rem'}}><Strong>{amount}{" "}{unit}</Strong></Text>
                                    </Flex>
                                    <Box>
                                        <Text key={title+name}>{name}</Text>
                                    </Box>
                                </Grid>
                            </div>)
                        })
                     : <Text color={'gray'}> 
                            No Ingredients
                        </Text>
                    }
                </Flex>
                <Separator style={{width: '100%', marginBottom:'1rem', marginTop:'1rem'}}/>
                <Flex justify="start" gap="3" direction={'column'} pl={'4'}>
                {stepArr.length > 0 ?
                        stepArr?.map(({ index, instruction })=>{
                            return(<div  key={instruction+index}>
                                <Grid columns={'20% auto'} justify='start' >
                                    <Flex style={{justifySelf:'center'}}>
                                        <Text key={title+index} color={"gray"} style={{paddingRight: '1.5rem'}}><Strong>{index}</Strong></Text>
                                    </Flex>
                                    <Box>
                                        <Text key={title+instruction}>{instruction}</Text>
                                    </Box>
                                </Grid>
                            </div>)
                        })
                     : <Text color={'gray'}> 
                            No Instructions
                        </Text>
                    }
                </Flex>
                
            </Flex>  
        </Card>
    );

}

export default RenderRecipe;
