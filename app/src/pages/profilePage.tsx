import { useNavigate } from 'react-router-dom'
import { EEventTypes } from '../models/EEventTypes'
import { EEventCategories } from '../models/EEventCategories'
import { evaluatePerformance } from '../devtools/colorUtils'
import { motion } from 'framer-motion'
import { EUserRole } from '../models/EUserRole'
import { useAppSelector } from '../hooks/redux'
import { useGetMetricsQuery } from '../services/dataService'

import EventCard from '../components/eventCard'

import userLogo from '../assets/userLogo.png'
import specIcon from '../assets/specLogo.png'
import moderIcon from '../assets/moderLogo.png'
import exitIcon from '../assets/exit.svg'


export default function ProfilePage() {
    const navigator = useNavigate()

    const USER = useAppSelector((state) => state.user)

    const metricsQuery = useGetMetricsQuery(USER.id)

    const getIcon = (userRole : EUserRole) => {
        switch (userRole) {
            case EUserRole.none: {
                return <img src={exitIcon} alt="" />
            }
            case EUserRole.speaker: {
                return <img src={specIcon} alt="" />

            }
            case EUserRole.worker: {
                return <img src={userLogo} alt="" />

            }
            case EUserRole.moderator: {
                return <img src={moderIcon} alt="" />
            }
        }
    }

    return (<>
        <div className="profile">
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1, delay: 0.3}}
            className='profile--heading'>
                <div className="profile--heading__avatar">
                    {getIcon(USER.role)}
                </div>
                <h2 className="profile--heading__fio">{USER.fio}</h2>
            </motion.div>
            {USER.role === EUserRole.moderator
                ? (<></>)
                : (<>
                    <motion.div 
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 0.5}}
                    className='metrics'>
                        {USER.role === EUserRole.speaker
                            ? (<>
                                <div className="metrics--happiness">
                                    <p className='metrics--happiness__name'>Рейтинг</p>
                                    <p className='metrics--happiness__value' style={{backgroundColor: evaluatePerformance(87)}}>9.8/10</p>
                                </div>
                            </>)
                            : (<>
                                {metricsQuery.isSuccess
                                    ? <><div className="metrics--happiness">
                                        <p className='metrics--happiness__name'>Рейтинг довольства</p>
                                        <p className='metrics--happiness__value' style={{backgroundColor: evaluatePerformance(metricsQuery.data[0].value)}}>{metricsQuery.data[0].value}%</p>
                                    </div>
                                    <div className="metrics--physical">
                                        <p className='metrics--physical__name'>Физическое здоровье</p>
                                        <p className='metrics--physical__value' style={{backgroundColor: evaluatePerformance(metricsQuery.data[1].value)}}>{metricsQuery.data[1].value}%</p>
                                    </div>
                                    <div className="metrics--mental">
                                        <p className='metrics--mental__name'>Психическое здоровье</p>
                                        <p className='metrics--mental__value' style={{backgroundColor: evaluatePerformance(metricsQuery.data[2].value)}}>{metricsQuery.data[2].value}%</p>
                                    </div>
                                    </>
                                    : <></>
                                }
                            </>)
                        }
                    </motion.div>   
                </>)
            }
            {USER.role === EUserRole.moderator
                ? (<></>)
                : (<>
                    <div className='profile--content'>
                        <EventCard 
                        type={EEventTypes.meetup} 
                        title="Фамилия Имя Отчество"
                        firstLine="Специальность: Психолог" 
                        secondLine="Оценка: 9.8/10"
                        buttonText="подробнее"
                        category={EEventCategories.psychology}
                        click={() => navigator('/application/lector/1')}
                        />
                        <EventCard 
                        type={EEventTypes.meetup} 
                        title="Фамилия Имя Отчество"
                        firstLine="Специальность: Финансист" 
                        secondLine="Оценка: 9.5/10"
                        buttonText="подробнее"
                        category={EEventCategories.finance}
                        click={() => navigator('/application/lector/2')}
                        />
                    </div>
                </>)
            }
        </div>
    </>)
}