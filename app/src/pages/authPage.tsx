import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useGetUserQuery } from "../services/authService"
import { useAppDispatch } from "../hooks/redux"
import { setName, setRole, setLogin, setId } from "../store/reducers/IUserSlice"
import { EUserRole } from "../models/EUserRole"

export default function AuthPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()
    //@ts-ignore
    const [userLogin, setUserLogin] = useState<string>("")
    //@ts-ignore
    const [userPassword, setUserPassword] = useState<string>("")

    const getUser = useGetUserQuery('')

    useEffect(() => {
		if (getUser.isSuccess) {
            console.log(getUser)
            dispatch(setId(getUser.data.id))
			dispatch(setName(getUser.data.fio))
            dispatch(setLogin(getUser.data.login))
            switch (getUser.data.role) {
                case "SPEAKER": {
                    dispatch(setRole(EUserRole.speaker))
				    navigator('/application')
                    return
                }
                case "WORKER": {
                    dispatch(setRole(EUserRole.worker))
				    navigator('/application')
                    return
                }
                case "ADMIN": {
                    dispatch(setRole(EUserRole.moderator))
				    navigator('/application')
                    return
                }
            }
		}
	}, [getUser]);

    // useEffect(() => {
	// 	if (isSuccess) {
	// 		dispatch(setLogin(userLogin))
	// 		//@ts-ignore
	// 		dispatch(setName(data.fio))
	// 		//@ts-ignore
	// 		dispatch(setId(data.id))
	// 		//@ts-ignore
    //         switch (data.role) {
    //             case EUserRole.speaker: {
    //                 dispatch(setRole(EUserRole.speaker))
	// 			    navigator('/application')
    //                 return
    //             }
    //             case EUserRole.worker: {
    //                 dispatch(setRole(EUserRole.worker))
	// 			    navigator('/application')
    //                 return
    //             }
    //             case EUserRole.moderator: {
    //                 dispatch(setRole(EUserRole.moderator))
	// 			    navigator('/application')
    //                 return
    //             }
    //             default: {
    //                 dispatch(setRole(EUserRole.none))
    //             }
    //         }
	// 	}
	// 	else if (isLoading) {
	// 		console.log('Loading...')
	// 	}
	// 	else if (isError) {
	// 		console.log("Error!", error)
	// 	}
	// }, [isSuccess])

    return (<>
        <main>
            <section className="auth">
                <div className="auth--container">
                    <motion.h1 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.5, delay: 0.2}}
                    className="auth--container__title"
                    >SALUS</motion.h1>
                    <motion.form 
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 0.3}}
                    className="form">
                        <div className="form--container">
                            <p className="form--title">Sign In</p>
                            <button 
                            type="button" 
                            className="form--submit"
                            onClick={() => window.location.href = 'https://salus.the-omnia.ru/api/v3/oauth2/authorization/google'}
                            >войти через google</button>
                        </div>
                        <p className="form--comp">BY OMNIA</p>
                    </motion.form>
                </div>
            </section>
        </main>
    </>)
}