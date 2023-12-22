import { EEventCategories } from "../models/EEventCategories";
import { EEventTypes } from "../models/EEventTypes";
import { getColor } from "../devtools/colorUtils";
import { useAppSelector } from "../hooks/redux";
import { EUserRole } from "../models/EUserRole";

import bucket from "../assets/bucket.svg"

interface EventCardProps {
    type: EEventTypes;
    category: EEventCategories
    title: string;
    firstLine: string;
    secondLine: string;
    thirdLine?: string;
    buttonText: string;
    click?: () => void;
    edit?: () => void;
    delete?: () => void
}

export default function EventCard(props: EventCardProps) {
    const USER = useAppSelector((state) => state.user)
    return (<>
        <div className="event">
            <div className="event--left" style={{
                backgroundColor: getColor(props.category),
                borderRadius: props.type === EEventTypes.lecture ? "20px 0 0 20px" : "0 0 0 20px",
                height: props.type === EEventTypes.lecture ? "100%" : "50%",
                alignSelf: props.type === EEventTypes.lecture ? "auto" : "flex-end"
            }}/>
            <div className="event--right">
                <div className="event--heading">
                    <h3 className="event--heading__title">{props.title || "Оглавление"}</h3>
                    <p className="event--heading__first">{props.firstLine || "первое поле"}</p>
                    <p className="event--heading__second">{props.secondLine || "второе поле"}</p>
                    {props.type === EEventTypes.lecture
                        ? <p className="event--heading__third">{props.thirdLine || "третье поле"}</p>
                        : <></>
                    }
                </div>
                {USER.role === EUserRole.moderator
                    ? (<div className="event--buttons">
                        <button 
                        type="button"
                        className="event--button"
                        style={{
                            backgroundColor: getColor(props.category)
                        }}
                        onClick={props.click}
                        >{props.buttonText || "текст для кнопки"}</button>
                        <div 
                        className="event--buttons__edit" 
                        style={{
                            backgroundColor: getColor(props.category)
                        }}
                        onClick={props.edit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="black"/>
                            </svg>
                        </div>
                        <div 
                        className="event--buttons__delete" 
                        style={{
                            backgroundColor: getColor(props.category)
                        }}
                        onClick={props.delete}
                        >
                            <img src={bucket} alt="" />
                        </div>
                    </div>)
                    : (<>
                        <button
                        type="button"
                        className="event--button"
                        style={{
                            backgroundColor: getColor(props.category)
                        }}
                        onClick={props.click}
                        >{props.buttonText || "текст для кнопки"}</button>   
                    </>)
                }
            </div>
        </div>
    </>)
}