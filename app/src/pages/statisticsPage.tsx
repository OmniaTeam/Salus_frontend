import { motion } from "framer-motion"

export default function StatisticsPage() {
    return (<>
        <div className='statistics'>
            <motion.h2 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="statistics--title"
            >Статистика</motion.h2>
            <div className="statistics--content">
                <p>coming soon...</p>
            </div>
        </div>
    </>)
}