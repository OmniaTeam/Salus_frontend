import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"
import { EUserRole } from "../models/EUserRole"

import userLogo from '../assets/userLogo.png'
import specLogo from '../assets/specLogo.png'
import moderLogo from '../assets/moderLogo.png'
import home from '../assets/home.svg'
import lectors from '../assets/lectors.svg'
import lectures from '../assets/lectures.svg'
import settings from '../assets/settings.svg'
import exitIcon from '../assets/exit.svg'
import loginIcon from '../assets/login.svg'

export default function Navbar() {
    const USER = useAppSelector((state) => state.user)
    
    const logOutHandler = async () => await fetch(
		"https://salus.the-omnia.ru/api/v3/logout", {
			method: "GET",
			headers : {
				"Content-Type": "application/json",
			}
	})

    const getIcon = (userRole : EUserRole) => {
        switch (userRole) {
            case EUserRole.none: {
                return (<>
                    <Link to="/auth" className="avatar-wrapper--profile">
                        <img src={loginIcon} alt="" />
                    </Link>
                </>)
            }
            case EUserRole.speaker: {
                return (<>
                    <Link to="/application/profile" className="avatar-wrapper--profile">
                        <img src={specLogo} alt="" />
                    </Link>
                </>)
            }
            case EUserRole.worker: {
                return (<>
                    <Link to="/application/profile" className="avatar-wrapper--profile">
                        <img src={userLogo} alt="" />
                    </Link>
                </>)
            }
            case EUserRole.moderator: {
                return (<>
                    <Link to="/application/profile" className="avatar-wrapper--profile">
                        <img src={moderLogo} alt="" />
                    </Link>
                </>)
            }
        }
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="navbar"
        >
            <div className="navbar--container">
                <Link to='' className="navbar--container__link">
                    <img src={home} alt="" />
                </Link>
                <Link to='lectures' className="navbar--container__link">
                    <img src={lectures} alt="" />
                </Link>
                <div className="avatar-wrapper">
                    {window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] === "profile"
                        ? (<div
                            className="avatar-wrapper--exit"
                            onClick={logOutHandler}
                        >
                            <img src={exitIcon} alt="Exit" />
                        </div>)
                        : (<>{getIcon(USER.role)}</>)
                    }
                </div>
                <Link to={USER.role === EUserRole.moderator ? "users" : 'lectors'} className="navbar--container__link">
                    <img src={lectors} alt="" />
                </Link>
                <Link to='settings' className="navbar--container__link">
                    <img src={settings} alt="" />
                </Link>
            </div>
        </motion.nav>
    )
}