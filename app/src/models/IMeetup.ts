export interface IMeetup {
    id : number,
    meetupName : string,
    workerName : string,
    date : string,
    time : string,
    link : string
}

export interface IMeetups {
    value : Array<IMeetup>
}