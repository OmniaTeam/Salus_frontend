import { EEventCategories } from "../models/EEventCategories";
import { EEventTypes } from "../models/EEventTypes";
import { getColor } from "../devtools/colorUtils";

interface EventCardProps {
    type: EEventTypes;
    category: EEventCategories
    title: string;
    firstLine: string;
    secondLine: string;
    thirdLine?: string;
    buttonText: string;
    click?: () => void
}

export default function EventCard(props: EventCardProps) {

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
                <button 
                type="button"
                className="event--button"
                style={{
                    backgroundColor: getColor(props.category)
                }}
                onClick={props.click}
                >{props.buttonText || "текст для кнопки"}</button>
            </div>
        </div>
    </>)
}