import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetLectorQuery, useGetWorkerQuery, usePostSignUpMutation } from "../services/dataService";
import { useAppSelector } from "../hooks/redux";
import { EUserRole } from "../models/EUserRole";
import { useState } from "react";

import Modal from "../components/modal";

export default function LectorPage() {
    const lectorId = useParams();
    const USER = useAppSelector((state) => state.user)
    const lectoreQuery = useGetLectorQuery(Number(lectorId.id));

    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    const [recordName, setRecordName] = useState<string>('Введите название')
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString())
    const [selectedTime, setSelectedTime] = useState<string>('00:00')

    const workerQuery = useGetWorkerQuery(USER.id)
    const [signUp, {}] = usePostSignUpMutation()

    const signUpHandler = () => {
        workerQuery.isSuccess
            ? signUp({
                workerId: workerQuery.data.id,
                body : {
                    name : recordName,
                    date : selectedDate.slice(0, 10) + 'T' + selectedTime,
                    speakerId : Number(lectorId.id),
                    meetRange : 60
                }
            })
            : {}
    }

    return (<>
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
                    <p className="metrics--spec__value">{lectoreQuery.data.email}</p>
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
                {USER.role === EUserRole.none
                    ? <button
                    className="lector--record"
                    style={{ backgroundColor: "#FFD4A8" }}
                    onClick={() => window.location.href = "https://salus.the-omnia.ru/auth"}
                    >
                    войдите, чтобы записаться
                    </button>
                    : <button
                    className="lector--record"
                    style={{ backgroundColor: "#FFD4A8", cursor: "pointer" }}
                    onClick={() => setIsEventModalOpen(true)}
                    >
                    записаться
                    </button>
                }
            </>
            ) : (
            <>
                {lectoreQuery.isLoading ? <>Loading...</> : <>Error!</>}
            </>
            )}
        </div>
        {isEventModalOpen && (
            <Modal onClose={() => setIsEventModalOpen(false)}>
                <div className="modal--container">
                    <h3 className="modal--container__titile">Запись</h3>
                    <div className="modal--form">
                        <input 
                        type="text"
                        placeholder="Введите название" 
                        className="modal--form__input"
                        value={recordName}
                        onChange={(event) => setRecordName(event.target.value)}
                        />
                        <input 
                        type="date" 
                        className="modal--form__input"
                        value={selectedDate.slice(0, 10)}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        />
                        <input 
                        type="time" 
                        className="modal--form__input"
                        onChange={(event) => setSelectedTime(event.target.value)}
                        />
                        <button
                        className="lector--record"
                        style={{ backgroundColor: "#FFD4A8", cursor: "pointer" }}
                        onClick={signUpHandler}
                        >
                        записаться
                        </button>
                    </div>
                </div>
            </Modal>
        )}
    </>);
}