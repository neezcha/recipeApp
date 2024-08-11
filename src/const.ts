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
