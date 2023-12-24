import { Outlet } from "react-router-dom"
import { useAppDispatch } from "../hooks/redux"
import { useGetUserQuery } from "../services/authService"
import { useEffect } from "react"
import { setId, setLogin, setName, setRole } from "../store/reducers/IUserSlice"
import { EUserRole } from "../models/EUserRole"

import Navbar from "../components/navbar"

export default function AppLayout() {
    const dispatch = useAppDispatch()

    const getUser = useGetUserQuery('')

    useEffect(() => {
        if (getUser.isSuccess) {
            dispatch(setId(getUser.data.id))
            dispatch(setName(getUser.data.fio))
            dispatch(setLogin(getUser.data.login))
            switch (getUser.data.role) {
                case EUserRole.moderator: {
                    dispatch(setRole(EUserRole.moderator))
                    return
                }
                case EUserRole.speaker: {
                    dispatch(setRole(EUserRole.speaker))
                    return
                }
                case EUserRole.worker: {
                    dispatch(setRole(EUserRole.worker))
                    return
                }
                default: {
                    dispatch(setRole(EUserRole.none))
                }
            }
        }
    }, [getUser])

    return (<>
        <main className="application">
            <section className="application--section">
                <div className="application--section__container">
                    <Outlet/>
                </div>
            </section>
            <Navbar/>
        </main>
    </>)
}