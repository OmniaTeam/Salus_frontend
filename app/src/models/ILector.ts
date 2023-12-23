import { EEventCategories } from "./EEventCategories";

export interface ILector {
    id : number,
    lectorName : string,
    lectorCategory : EEventCategories,
    rating : number
}

export interface ILectors {
    value : Array<ILector>
}