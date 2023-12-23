import { EEventCategories } from "./EEventCategories";

export interface ILecture {
    id : number,
    topic : string,
    category : EEventCategories,
    lectorName : string,
    date : string,
    time : string,
    platform : string,
    link : string
}

export interface ILectureReq {
    id: number,
    name: string,
    speakerId: number,
    subjectId: number,
    date: string,
    type: string,
    connectType: string,
    connectLink: string
}

export interface ILectures {
    value : Array<ILecture>
}