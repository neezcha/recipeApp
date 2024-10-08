/*** EXAMPLES ***/
export enum exampleEnum {
    KEY_NAME = "value",
    UNIQUE_KEU = "value",
}

export const ArrayEnum = {
    ItemA : 'a',
    ItemB: 'b'
} as const; 
export const exampleMap = {
    [ArrayEnum.ItemA]: "string",
    [ArrayEnum.ItemB]: "string"
};

export interface ExampleProps {
    optionalvar?: boolean;
    multioptionvar?: RegExp | ((val: any) => boolean);
    stringvar: string;
    functionvar?: (val: string) => string;
}
export interface InterfaceExtends extends ExampleProps {
    multioption: 'number' | 'boolean' | 'string';
}

/*** UNITS OF MEASURMENT ***/
export enum MiscUnitsEnum {
    GRAMS = "g",
    LARGE = "GL",
    MEDIUM = "MD",
    SMALL = "SM",
    PINCH = "PINCH",
    DASH = "DASH",
    GARNISH = "GARNISH",
} 
export const miscUnitKeys = Object.keys(MiscUnitsEnum);
export enum AmericanFluidUnitsEnum {
    US_TEASPOON = "TSP",
    US_TABLESPOON = "TBSP",
    US_FLUID_OZ = "FLOZ",
    US_SHOT = "JIG",
    US_CUP = "C",
    US_PINT = "PT",
    US_QUART = "QT",
    US_POTTLE = "POT",
    US_GALLON = "GAL",
}
export const usFluidUnitKeys = Object.keys(AmericanFluidUnitsEnum);
export enum AmericanWeightUnitsEnum {
    US_OUNCE = "OZ",
    US_POUND = "LB",
    US_FLUID_OZ = "GAL",
}
export const usWeightUnitKeys = Object.keys(AmericanFluidUnitsEnum);
export enum MetricUnitsEnum {
    KEY_NAME = "value",
    UNIQUE_KEU = "value",
}
export const metricUnits = Object.keys(AmericanFluidUnitsEnum);

export const miscUnits = [
    {value: "COUNT", label: "count"},
    {value: "LARGE", label: "LG"},
    {value: "MEDIUM", label: "MD"},
    {value: "SMALL", label: "SM"},
    {value: "PINCH", label: "PINCH"},
    {value: "DASH", label: "DASH"},
    {value: "GARNISH", label: "GARNISH"},
    {value: "GRAMS", label: "g"},
]
export const usFluidUnits = [
    {value: "US_TEASPOON", label: "TSP"},
    {value: "US_TABLESPOON", label: "TBSP"},
    {value: "US_FLUID_OZ", label: "FLOZ"},
    {value: "US_SHOT", label: "JIG"},
    {value: "US_CUP", label: "C"},
    {value: "US_PINT", label: "PT"},
    {value: "US_QUART", label: "QT"},
    {value: "US_POTTLE", label: "POT"},
    {value: "US_GALLON", label: "GAL"},
]
export const usWeightUnits = [
    {value: "US_OUNCE", label: "OZ"},
    {value: "US_POUND", label: "LB"},
]

/*** UNIT CONVERSION RATES ***/
export const converstionOptions = [
    {label: AmericanFluidUnitsEnum.US_CUP, floz: 8, L: .23659},
    {label: AmericanFluidUnitsEnum.US_TABLESPOON, cup: .0008},
]
export const conversionAmericanFluidUnitsToLeter = {
    [AmericanFluidUnitsEnum.US_TEASPOON] : .00493,
    [AmericanFluidUnitsEnum.US_TABLESPOON] : .01479,
    [AmericanFluidUnitsEnum.US_FLUID_OZ] : .02957,
    [AmericanFluidUnitsEnum.US_SHOT] : .04436,
    [AmericanFluidUnitsEnum.US_CUP] : .23659,
    [AmericanFluidUnitsEnum.US_PINT] : .47318,
    [AmericanFluidUnitsEnum.US_QUART] : .95,
    [AmericanFluidUnitsEnum.US_GALLON] : 3.79,
}

/*** RECIPE SPECS ***/
export interface CommonProps {
    disabled?: boolean;
    validation?: RegExp | ((val: any) => boolean);
    errorText?: string;
    helpText?: string;
    label: string; 
    requried?: string; 
    placeholder?: string; 
    defaultValue?: any;
    valueGetter?: (val: string) => string; // fn return formatted value
}
export interface InputSegment extends CommonProps {
    type: 'number' | 'boolean' | 'string';
}
export interface DropDownSegment extends CommonProps {
    type: 'dropdown';
    choices?: string[];
    dataSource?: string; 
}

/*** QUOTE TEXT ***/
export const QUOTES = {
    "BREAD" : "All bread is made of wood, / cow dung, packed brown moss, / the bodies of dead animals, the teeth / and backbones, what is left / after the ravens. This dirt / flows through the stems into the grain, / into the arm, nine strokes / of the axe, skin from a tree, / good water which is the first / gift, four hours. //    / Live burial under a moist cloth, / a silver dish, the row / of white famine bellies / swollen and taut in the oven, / lungfuls of warm breath stopped / in the heat from an old sun. //   / Good bread has the salt taste / of your hands after nine / strokes of the axe, the salt / taste of your mouth, it smells / of its own small death, of the deaths / before and after. //   / Lift these ashes / into your mouth, your blood; / to know what you devour / is to consecrate it, / almost. All bread must be broken / so it can be shared. Together / we eat this earth. // - Margret Atwood",
    "WELL" : "One cannot think well, love well, sleep well, if one has not dined well. — Virginia Woolf",
    "BALANCED" : "Food is an important part of a balanced diet. — Fran Lebowitz",
    "HUNGER" : "The best seasoning for food is hunger; for drink, thirst. — Socrates",
}
