import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
    onClose: () => void;
    children: ReactNode
}

export default function Modal(props: ModalProps) {
    return (<>
        <div className="modal--overlay" onClick={props.onClose}>
            <motion.div 
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="modal--content" 
            onClick={(e) => e.stopPropagation()}>
                {props.children}
            </motion.div>
        </div>
    </>)
}