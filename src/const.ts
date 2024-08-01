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

/*** UNITS OF MEASURMENT ***/

/*** UNIT CONVERSION RATES ***/
