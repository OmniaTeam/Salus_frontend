import { motion } from "framer-motion"

export default function MeditationsPage() {
    return (<>
        <div className='meditations'>
            <motion.h2 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="meditations--title"
            >Медитации</motion.h2>
            <div className="meditations--content">
                <p>coming soon...</p>
            </div>
        </div>
    </>)
}