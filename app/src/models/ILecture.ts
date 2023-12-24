export interface ILecture {
    meet_id : number,
    meet_name : string,
    subject : number,
    speaker_name : string,
    date : string,
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