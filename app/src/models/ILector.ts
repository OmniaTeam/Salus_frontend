import { EEventCategories } from "./EEventCategories";

export interface ILector {
    id : number,
    fio : string,
    subjectName : EEventCategories,
    rating : number
}

export interface ILectors {
    value : Array<ILector>
}