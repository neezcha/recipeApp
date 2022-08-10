import { Recipe } from "../types/recipe";
import { Ingredient } from "../types/ingredient"
import { Unit } from "../types/unit";
import { Console } from "console";
import RecipeItem from "./RecipeItem";
import NavMenu from "./Menu";

const MainPage : React.FC = () => {


    // individually declared resuable code 
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
            {amount:1, unit:"cup", name:"Cereal" } // inline object creation
        ],
        steps:[
            {index:1, instruction:"Gather ingredients."},
            {index:2, instruction:"Get bowl and a spoon."},
            {index:3, instruction:"Pour cereal into bowl."},
            {index:4, instruction:"Pour Milk into bowl."}
        ] 
    };

    const whateves = ()=>console.log("test text");
    const recipes :Recipe[] = [cereal, {...cereal, title: "Complex Cereal"}];
    /*
    return <div> 
        <div>
            <NavMenu/> 
        </div>
        <div className="pointer" id="title" onClick={whateves}>
            {"Recipe Page <3"}            
        </div>
        <div>
            {recipes.map((obj, indx, arr)=>{
                console.log(obj);
                return <RecipeItem recipe={recipes[0]}/>;
            })}
        </div>
    </div>;
    */
   return <div>
    <div>
        <NavMenu/>
    </div>
   </div>

}

export default MainPage;