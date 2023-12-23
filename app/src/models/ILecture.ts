import { EEventCategories } from "./EEventCategories";

export interface ILecture {
    id : number,
    topic : string,
    category : EEventCategories,
    lectorName : string,
    date : string,
    time : string,
    link : string
}

export interface ILectures {
    value : Array<ILecture>
}