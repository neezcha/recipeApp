import { Ingredient } from "./ingredient";
import { Rating } from "./rating";
import{ Step } from "./step"

 export type Recipe = {
    title : string;
    description: string; 
    ingredients: Ingredient[] ;
    steps: Step [];
    cost?: Rating;
    health?: Rating;
    skill?: Rating; 
    portion?: Rating; 
    freezable?: Rating; 
} 