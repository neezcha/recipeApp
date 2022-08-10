import { Ingredient } from "./ingredient";
import { Rating } from "./rating";
import{ Step } from "./step"

 export type Recipe = {
    title : string;
    description: string; 
    cost?: Rating;
    health?: Rating;
    skill?: Rating; 
    portion?: Rating; 
    ingredients: Ingredient[] ;
    steps: Step [];
} 