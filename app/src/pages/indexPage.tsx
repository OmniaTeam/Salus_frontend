import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAppSelector } from "../hooks/redux"
import { EUserRole } from "../models/EUserRole"

export default function IndexPage() {
    const navigator = useNavigate()

    const USER = useAppSelector((state) => state.user)

    const getText = (role: EUserRole) => {
        switch (role) {
            case EUserRole.moderator: return "_пользователи"
            case EUserRole.speaker: return "_мои клиенты"
            case EUserRole.worker || EUserRole.none: return "_специалисты"
            default: return "_специалисты"
        }
    }

    return (<>
        <div className='index'>
            <motion.h2 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="index--title"
            >Главная</motion.h2>
            <div className='index--cards'>
                <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.1}}
                onClick={() => {navigator('lectures')}}
                className="index--card index--card__lectures">
                    <p>{USER.role === EUserRole.speaker
                    ? "_мои лекции"
                    : "_лекции"
                    }</p>
                </motion.div>
                <motion.div 
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.2}}
                onClick={() => {USER.role === EUserRole.moderator ? navigator('users') : navigator('lectors')}}
                className="index--card index--card__lectors">
                    <p>{getText(USER.role)}</p>
                </motion.div>
                <motion.div 
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.3}}
                onClick={() => {navigator("meditations")}}
                className="index--card index--card__meditations">
                    <p>_медитации</p>
                </motion.div>
                <motion.div 
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.4}}
                onClick={() => {navigator("statistics")}}
                className="index--card index--card__statistics">
                    <p>_статистика</p>
                </motion.div>
            </div>
        </div>
    </>)
}