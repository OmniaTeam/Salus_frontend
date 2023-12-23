import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { evaluatePerformance } from "../devtools/colorUtils"

export default function UserPage() {
    const userId = useParams()

    return (<>
        <div className="user">
            <motion.h1
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="user--title"
            >{userId.id}</motion.h1>
            <motion.div 
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: 0.5}}
            className='metrics'>
                <div className="metrics--happiness">
                    <p className='metrics--happiness__name'>Рейтинг довольства</p>
                    <p className='metrics--happiness__value' style={{backgroundColor: evaluatePerformance(87)}}>87/100</p>
                </div>
                <div className="metrics--physical">
                    <p className='metrics--physical__name'>Физическое здоровье</p>
                    <p className='metrics--physical__value' style={{backgroundColor: evaluatePerformance(73)}}>73/100</p>
                </div>
                <div className="metrics--mental">
                    <p className='metrics--mental__name'>Психическое здоровье</p>
                    <p className='metrics--mental__value' style={{backgroundColor: evaluatePerformance(53)}}>53/100</p>
                </div>
            </motion.div>
            {/* <button className="lector--record" style={{backgroundColor: "#FFD4A8"}}>записаться</button> */}
        </div>
    </>)
}