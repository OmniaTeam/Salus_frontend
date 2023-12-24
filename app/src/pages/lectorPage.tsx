import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/redux";
import { useGetLectorQuery } from "../services/dataService";

async function getSpeakerFio(speakerId : number) {
    try {
        const response = await fetch(
            `https://salus.the-omnia.ru/api/v3/user/${speakerId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export default function LectorPage() {
    const lectorId = useParams();

    const LECTOR = useAppSelector((state) => state.lector);
    const lectoreQuery = useGetLectorQuery(Number(lectorId.id));

    const [speakerFio, setSpeakerFio] = useState("");
    const [speakerEmail, setSpeakerEmail] = useState("")

    useEffect(() => {
        const fetchSpeakerFio = async () => {
            const fio = await getSpeakerFio(Number(lectorId.id)).then((res) => res.fio);
            const email = await getSpeakerFio(Number(lectorId.id)).then((res) => res.username);
            setSpeakerFio(fio);
            setSpeakerRole(role);
            setSpeakerEmail(email)
        };

        fetchSpeakerFio();
    }, [lectorId.id]);

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
                {speakerFio}
                </motion.h1>
                <div className="metrics">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="metrics--spec"
                >
                    <p className="metrics--spec__name">Специальность</p>
                    <p className="metrics--spec__value">{LECTOR.subjectName}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="metrics--spec"
                >
                    <p className="metrics--spec__name">Почта</p>
                    <p className="metrics--spec__value">{speakerEmail}</p>
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