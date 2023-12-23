import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/redux";

export default function LectorPage() {
    const lectorId = useParams()

    const LECTOR = useAppSelector((state) => state.lector)

    return (<>
        <div className="lector">
            <motion.h1
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="lector--title"
            >{LECTOR.lectorName} {lectorId.id}</motion.h1>
            <div className="metrics">
                <motion.div 
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                className="metrics--spec">
                    <p className="metrics--spec__name">Специальность</p>
                    <p className="metrics--spec__value">{LECTOR.lectorCategory}</p>
                </motion.div>
                <motion.div 
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                className="metrics--rating">
                    <p className="metrics--rating__name">Рейтинг</p>
                    <p className="metrics--rating__value" 
                    style={{backgroundColor: "#F9E07C"}}>{LECTOR.rating}</p>
                </motion.div>
            </div>
            <button className="lector--record" style={{backgroundColor: "#FFD4A8"}}>записаться</button>
        </div>
    </>)
}