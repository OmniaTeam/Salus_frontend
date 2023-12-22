import { motion } from "framer-motion"

export default function SettingsPage() {
    return (<>
        <div className='settings'>
            <motion.h2 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="settings--title"
            >Настройки</motion.h2>
            <div className="settings--content">
                <p>coming soon...</p>
            </div>
        </div>
    </>)
}