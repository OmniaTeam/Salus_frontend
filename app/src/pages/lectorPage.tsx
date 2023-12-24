import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetLectorQuery } from "../services/dataService";

export default function LectorPage() {
    const lectorId = useParams();

    const lectoreQuery = useGetLectorQuery(Number(lectorId.id));

    return (
        <>
        <div className="lector">
            {lectoreQuery.isSuccess ? (
            <>
                <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="lector--title"
                >
                {lectoreQuery.data.fio}
                </motion.h1>
                <div className="metrics">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="metrics--spec"
                >
                    <p className="metrics--spec__name">Специальность</p>
                    <p className="metrics--spec__value">{lectoreQuery.data.subjectName}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="metrics--spec"
                >
                    <p className="metrics--spec__name">Почта</p>
                    <p className="metrics--spec__value">{"speakerEmail"}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="metrics--rating"
                >
                    <p className="metrics--rating__name">Рейтинг</p>
                    <p
                    className="metrics--rating__value"
                    style={{ backgroundColor: "#F9E07C" }}
                    >
                    {lectoreQuery.data.rating}
                    </p>
                </motion.div>
                </div>
                <button
                className="lector--record"
                style={{ backgroundColor: "#FFD4A8" }}
                >
                записаться
                </button>
            </>
            ) : (
            <>
                {lectoreQuery.isLoading ? <>Loading...</> : <>Error!</>}
            </>
            )}
        </div>
        </>
    );
}