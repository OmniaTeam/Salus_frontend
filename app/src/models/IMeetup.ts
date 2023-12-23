export interface IMeetup {
    id : number,
    meetupName : string,
    workerName : string,
    date : string,
    time : string,
    platform : string,
    link : string
}

export interface IMeetups {
    value : Array<IMeetup>
}