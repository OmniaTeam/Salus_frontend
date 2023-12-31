import { motion } from "framer-motion"
import { EEventTypes } from "../models/EEventTypes"
import { EEventCategories } from "../models/EEventCategories"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { EUserRole } from "../models/EUserRole"
import { getCategoryById, getCategoryId, getCategoryName } from "../devtools/categoryUtils"
import { setCategory } from "../store/reducers/ISettingsSlice"
import { useAddNewLectureMutation, useGetLectorsQuery, useGetLecturesByDateQuery, useGetSubjectsQuery, useUpdateLectureMutation } from "../services/dataService"
import { setLecturesData } from "../store/reducers/ILecturesSlice"
import { clearLectorsData } from "../store/reducers/ILectorsSlice"
import { 
    setLectureId, 
    setLectureTopic, 
    setLectureCategory, 
    setLectorName, 
    setLecturePlatform, 
    setLectureLink, 
    setLectureDate 
} from "../store/reducers/ILectureSlice"

import EventCard from "../components/eventCard"
import Modal from "../components/modal"
import DropdownMenu from "../components/dropdownMenu"

export default function LecturesPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const USER = useAppSelector((state) => state.user)
    const LECTURE = useAppSelector((state) => state.lecture)
    const SETTINGS = useAppSelector((state) => state.settings)

    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettignsModalOpen] = useState<boolean>(false)
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState<boolean>(false)
    const [isEditEventModalOpen, setIsEditEventModalOpen] = useState<boolean>(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString())
    const [selectedCategory, setSelectedCategory] = useState<string>(getCategoryName(SETTINGS.categories));
    const [selectedLector, setSelectedLector] = useState<string>('Выберите сотрудника')
    const [selectedPlatform, setSelectedPlatform] = useState<string>('Выберите платформу')
    const [selectedTime, setSelectedTime] = useState<string>('00:00')
    const [lectureName, setLectureName] = useState<string>('default')
    const [lectureConfLink, setLectureConfLink] = useState<string>('default')

    const lecturesQuery = useGetLecturesByDateQuery(selectedDate)
    const [updateLecture, {}] = useUpdateLectureMutation()
    const subjectsQuery = useGetSubjectsQuery('')
    const lectorsQuery = useGetLectorsQuery('')
    const [addNewLecture, {}] = useAddNewLectureMutation()

    const updateHandler = () => {
        updateLecture({
            meet_id: LECTURE.meet_id,
            meet_name: lectureName,
            subject: getCategoryId(EEventCategories.psychology),
            speaker_name: LECTURE.speaker_name,
            date: selectedDate.slice(0, 10) + 'T' + selectedTime,
            platform: selectedPlatform,
            link: lectureConfLink
        })
    }

    const addNewLectureHandler = () => {
        addNewLecture({
            meet_id: -1,
            meet_name: lectureName,
            subject: getCategoryId(EEventCategories.psychology),
            speaker_name: selectedLector,
            date: selectedDate.slice(0, 10) + "T" + selectedTime,
            platform: selectedPlatform,
            link: lectureConfLink
        })
    }

    useEffect(() => {
        if (lecturesQuery.isSuccess) {
            dispatch(clearLectorsData([]))
            if (lecturesQuery.data.length !== 0) {
                lecturesQuery.data.forEach(async (value) => {
                    if (value !== null) {
                        dispatch(setLecturesData(
                            {
                                meet_id: value.meet_id,
                                meet_name: String(value.meet_name),
                                subject: getCategoryId(EEventCategories.psychology),
                                speaker_name: String(value.speaker_name),
                                date: String(value.date.slice(0, 19)),
                                platform: String(value.platform),
                                link: String(value.link)
                            })
                        )
                    } else {
                        console.log("Govno", value)
                    }
                })
            }
        }
        if (lecturesQuery.isLoading) {
            console.log("Loading...")
        }
        if (lecturesQuery.isError) {
            console.log("Error")
        }
    }, [lecturesQuery])

    const handleCategoriesSelect = (category: string) => {
		const selectedCategory = categories.find(
			(option) => option.value === category
		);
        if (selectedCategory) {
			setSelectedCategory(category);
            switch (category) {
                case "Все категории": {
                    dispatch(setCategory(EEventCategories.all))
                    return
                }
                case "Психология": {
                    dispatch(setCategory(EEventCategories.psychology))
                    return
                }
                case "Финансы": {
                    dispatch(setCategory(EEventCategories.finance))
                    return
                }
                case "Здоровье": {
                    dispatch(setCategory(EEventCategories.health))
                    return
                }
                case "Питание": {
                    dispatch(setCategory(EEventCategories.feed))
                    return
                }
                case "Медитации": {
                    dispatch(setCategory(EEventCategories.meditation))
                    return
                }
                default: {
                    dispatch(setCategory(EEventCategories.all))
                    return
                }
            }
		}
	};

    const handleLectorsSelect = (lector: string) => {
		const selectedLector = lectors.find(
			(option) => option.value === lector 
		);
        if (selectedLector) {
			setSelectedLector(lector);
		}
	};

    const handlePlatformsSelect = (platform: string) => {
		const selectedPlatforms = platforms.find(
			(option) => option.value === platform
		);
        if (selectedPlatforms) {
			setSelectedPlatform(platform);
		}
	};

    const categories = subjectsQuery.data?.map((value) => ({
        value : value.name,
        label : value.name,
        id : value.id
    })) || []

    const lectors = lectorsQuery.data?.map((value) => ({
        value : value.fio,
        label : value.fio,
        id : value.id
    })) || []

    const platforms = [
        {
            value : "Google meets",
            label : "Google meets",
            id: 0
        },
        {
            value : "Zoom",
            label : "Zoom",
            id: 1
        },
        {
            value : "Discord",
            label : "Discord",
            id: 2
        },
        {
            value : "Skype",
            label : "Skype",
            id: 3
        }
    ]

    const renderLectures = () => {
        if (lecturesQuery.isSuccess) {
            return lecturesQuery.data.map((elem, index) => (
                <motion.div 
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                key={index}>
                    <EventCard 
                    type={EEventTypes.lecture} 
                    title={elem.meet_name}
                    firstLine={getCategoryById(elem.subject) || EEventCategories.psychology} 
                    secondLine={elem.speaker_name}
                    thirdLine={elem.date}
                    buttonText={USER.role === EUserRole.none ? "войти в систему" : "подробнее"}
                    category={getCategoryById(elem.subject) || EEventCategories.psychology}
                    click={USER.role === EUserRole.none ? () => navigator('/auth') : () => {
                        dispatch(setLectureId(elem.meet_id))
                        dispatch(setLectureTopic(elem.meet_name))
                        dispatch(setLectureCategory(elem.subject))
                        dispatch(setLectorName(elem.speaker_name))
                        dispatch(setLectureDate(elem.date.slice(0, 19)))
                        dispatch(setLecturePlatform(elem.platform))
                        dispatch(setLectureLink(elem.link))
                        setIsEventModalOpen(true)
                    }}
                    edit={() => {
                        dispatch(setLectureId(elem.meet_id))
                        dispatch(setLectureTopic(elem.meet_name))
                        dispatch(setLectureCategory(elem.subject))
                        dispatch(setLectorName(elem.speaker_name))
                        dispatch(setLectureDate(elem.date.slice(0, 19)))
                        dispatch(setLecturePlatform(elem.platform))
                        dispatch(setLectureLink(elem.link))
                        setIsEditEventModalOpen(true)
                    }}
                    delete={() => setIsDeleteModalOpen(true)}
                    />
                </motion.div>)
            )
        }
    }

    return (<>
        <div className="lectures">
            <div className='lectures--heading'>
                <motion.h2 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className="lectures--heading__title"
                >{USER.role === EUserRole.speaker
                    ? "Мои лекции"
                    : "Лекции"
                }</motion.h2>
                <div className="categories">
                    {USER.role === EUserRole.none 
                    || USER.role === EUserRole.moderator
                    || USER.role === EUserRole.speaker 
                        ? (<></>)
                        : (<>
                            <motion.p 
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            className="categories--relaited">Рекомендации</motion.p>   
                        </>)
                    }
                    <motion.input
                    type="date"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                    value={selectedDate.slice(0, 10)}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="categories--calendar"
                    />
                    {USER.role === EUserRole.speaker
                        ? (<></>)
                        : (<>
                            <motion.div 
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            onClick={() => setIsSettignsModalOpen(true)}
                            className="categories--settings">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M10.999 7.33127C9.98443 7.33127 9.01138 7.71767 8.29394 8.40547C7.5765 9.09326 7.17344 10.0261 7.17344 10.9988C7.17344 11.9715 7.5765 12.9043 8.29394 13.5921C9.01138 14.2799 9.98443 14.6663 10.999 14.6663C12.0137 14.6663 12.9867 14.2799 13.7042 13.5921C14.4216 12.9043 14.8246 11.9715 14.8246 10.9988C14.8246 10.0261 14.4216 9.09326 13.7042 8.40547C12.9867 7.71767 12.0137 7.33127 10.999 7.33127ZM9.08624 10.9988C9.08624 10.5125 9.28777 10.046 9.64649 9.70214C10.0052 9.35824 10.4917 9.16504 10.999 9.16504C11.5064 9.16504 11.9929 9.35824 12.3516 9.70214C12.7103 10.046 12.9118 10.5125 12.9118 10.9988C12.9118 11.4852 12.7103 11.9516 12.3516 12.2955C11.9929 12.6394 11.5064 12.8326 10.999 12.8326C10.4917 12.8326 10.0052 12.6394 9.64649 12.2955C9.28777 11.9516 9.08624 11.4852 9.08624 10.9988ZM16.0068 4.39358C15.654 4.45571 15.2899 4.38112 14.9944 4.18619C14.6989 3.99127 14.4961 3.69192 14.4306 3.35383L13.9333 0.757221C13.9089 0.630769 13.8459 0.514112 13.7522 0.422045C13.6586 0.329979 13.5385 0.266653 13.4073 0.240099C11.8188 -0.0827998 10.1774 -0.0827998 8.58891 0.240099C8.45767 0.266653 8.33761 0.329979 8.24395 0.422045C8.1503 0.514112 8.08729 0.630769 8.0629 0.757221L7.56748 3.35383C7.5313 3.53877 7.45375 3.71399 7.34015 3.86744C7.22654 4.02088 7.0796 4.14889 6.90944 4.24266C6.73927 4.33642 6.54993 4.39372 6.35445 4.41059C6.15897 4.42746 5.962 4.40352 5.7771 4.3404L3.1776 3.45286C3.05147 3.40955 2.91479 3.40298 2.78476 3.43398C2.65474 3.46498 2.53719 3.53216 2.44691 3.62707C1.35742 4.77676 0.534671 6.1349 0.0329576 7.61184C-0.00843867 7.73397 -0.0108937 7.86517 0.0259062 7.98865C0.0627062 8.11212 0.137088 8.22227 0.23954 8.305L2.34745 10.0122C2.49722 10.1334 2.6176 10.2845 2.70017 10.4549C2.78275 10.6253 2.82553 10.8109 2.82553 10.9988C2.82553 11.1867 2.78275 11.3723 2.70017 11.5427C2.6176 11.7131 2.49722 11.8642 2.34745 11.9854L0.23954 13.6926C0.137088 13.7753 0.0627062 13.8855 0.0259062 14.009C-0.0108937 14.1324 -0.00843867 14.2636 0.0329576 14.3858C0.535024 15.863 1.35846 17.2212 2.44882 18.3705C2.53911 18.4655 2.65666 18.5326 2.78668 18.5636C2.9167 18.5946 3.05338 18.5881 3.17951 18.5448L5.78092 17.6572C5.9658 17.5934 6.16293 17.569 6.35864 17.5856C6.55435 17.6022 6.74396 17.6594 6.9143 17.7532C7.08464 17.8471 7.23164 17.9754 7.34509 18.1291C7.45854 18.2829 7.53573 18.4585 7.57131 18.6438L8.06481 21.2404C8.11454 21.4971 8.32304 21.7025 8.59083 21.7557C10.1799 22.0787 11.822 22.0787 13.4111 21.7557C13.5418 21.7292 13.6614 21.666 13.7547 21.5743C13.848 21.4826 13.9108 21.3664 13.9352 21.2404L14.4325 18.6438C14.4687 18.4588 14.5463 18.2836 14.6599 18.1302C14.7735 17.9767 14.9204 17.8487 15.0906 17.755C15.2607 17.6612 15.4501 17.6039 15.6455 17.587C15.841 17.5701 16.038 17.5941 16.2229 17.6572L18.8224 18.5448C19.0806 18.6328 19.3695 18.5631 19.5531 18.3705C20.6426 17.2209 21.4653 15.8627 21.967 14.3858C22.0084 14.2636 22.0109 14.1324 21.9741 14.009C21.9373 13.8855 21.8629 13.7753 21.7605 13.6926L19.6526 11.9854C19.5025 11.8644 19.3818 11.7134 19.2991 11.5429C19.2163 11.3725 19.1734 11.1868 19.1734 10.9988C19.1734 10.8108 19.2163 10.6251 19.2991 10.4547C19.3818 10.2843 19.5025 10.1332 19.6526 10.0122L21.7605 8.305C21.8629 8.22227 21.9373 8.11212 21.9741 7.98865C22.0109 7.86517 22.0084 7.73397 21.967 7.61184C21.4645 6.13447 20.6404 4.77625 19.5493 3.62707C19.459 3.53216 19.3414 3.46498 19.2114 3.43398C19.0814 3.40298 18.9447 3.40955 18.8186 3.45286L16.2172 4.3404C16.1481 4.36421 16.0771 4.38261 16.0048 4.39541M3.3421 5.459L5.1344 6.06964C5.58036 6.22185 6.05548 6.27944 6.52693 6.23844C6.99838 6.19744 7.45492 6.05882 7.86504 5.83216C8.27515 5.6055 8.62906 5.29619 8.90232 4.92561C9.17558 4.55503 9.36168 4.132 9.44776 3.68575L9.78633 1.90699C10.5898 1.81082 11.4026 1.81082 12.206 1.90699L12.5465 3.68575C12.632 4.13231 12.8177 4.55572 13.0908 4.92664C13.3639 5.29756 13.7179 5.60712 14.1282 5.83388C14.5385 6.06064 14.9953 6.19917 15.467 6.23988C15.9387 6.28059 16.4139 6.2225 16.8599 6.06964L18.6502 5.45533C19.138 6.06781 19.5435 6.7353 19.8553 7.44313L18.4131 8.61124C18.0507 8.90456 17.7594 9.27017 17.5596 9.68255C17.3598 10.0949 17.2563 10.5441 17.2563 10.9988C17.2563 11.4535 17.3598 11.9027 17.5596 12.3151C17.7594 12.7274 18.0507 13.093 18.4131 13.3864L19.8572 14.5545C19.5443 15.263 19.1394 15.9309 18.6522 16.5423L16.8599 15.9298C16.4139 15.7776 15.9388 15.72 15.4673 15.761C14.9959 15.802 14.5393 15.9406 14.1292 16.1673C13.7191 16.394 13.3652 16.7033 13.0919 17.0738C12.8187 17.4444 12.6326 17.8674 12.5465 18.3137L12.206 20.0925C11.4026 20.1887 10.5898 20.1887 9.78633 20.0925L9.44776 18.3137C9.36228 17.8671 9.17655 17.4437 8.90344 17.0728C8.63033 16.7019 8.27637 16.3923 7.86608 16.1656C7.45579 15.9388 6.99897 15.8003 6.52729 15.7596C6.05561 15.7189 5.58034 15.7769 5.1344 15.9298L3.34784 16.5423C2.86052 15.9309 2.45564 15.263 2.14278 14.5545L3.58503 13.3845C3.94709 13.0912 4.23805 12.7257 4.43763 12.3135C4.63721 11.9013 4.74061 11.4523 4.74061 10.9979C4.74061 10.5434 4.63721 10.0945 4.43763 9.68227C4.23805 9.27007 3.94709 8.90457 3.58503 8.61124L2.14086 7.44313C2.45504 6.7352 2.85983 6.06748 3.34593 5.45533" fill="#1E1E1E"/>
                                </svg>
                            </motion.div>
                        </>)
                    }
                    {USER.role === EUserRole.moderator
                        ? (<>
                            <motion.div 
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            onClick={() => setIsAddNewModalOpen(true)}
                            className="categories--settings">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M22 12.5693H12.5714V21.9979H9.42857V12.5693H0V9.42644H9.42857V-0.00213623H12.5714V9.42644H22V12.5693Z" fill="black"/>
                                </svg>
                            </motion.div>
                        </>)
                        : (<></>)
                    }
                </div>
            </div>
            <div className="lectures--content">{renderLectures()}</div>
        </div>
        {isEventModalOpen && (
            <Modal onClose={() => setIsEventModalOpen(false)}>
                <div className="modal--container">
                    <h3 className="modal--container__title">{LECTURE.meet_name}</h3>
                    <div className="modal--info">
                        <p className="modal--info__name">Категория: {LECTURE.subject}</p>
                        <p className="modal--info__path">Дата: {LECTURE.date}</p>
                        <p className="modal--info__path">Лектор: {LECTURE.speaker_name}</p>
                        <p className="modal--info__path">Платформа: {LECTURE.platform}</p>
                    </div>
                    <Link to={LECTURE.link} className="modal--link" target="_blank">подключиться к конференции</Link>
                </div>
            </Modal>
        )}
        {isSettingsModalOpen && (
            <Modal onClose={() => setIsSettignsModalOpen(false)}>
                <div className="modal--container">
                    <h3 className="modal--container__title">Детальные настройки</h3>
                    <DropdownMenu
                    defaultSelected={selectedCategory}
                    options={categories}
                    onSelectOption={handleCategoriesSelect}
					/>
                </div>
            </Modal>
        )}
        {isAddNewModalOpen && (
            <Modal onClose={() => setIsAddNewModalOpen(false)}>
                <div className="modal--container">
                    <h3 className="modal--container__title">Добавить новую лекцию</h3>
                    <div className="modal--form">
                        <input 
                        type="text" 
                        placeholder="Тема лекции"
                        className="modal--form__input"
                        onChange={(e) => setLectureName(e.target.value)}
                        />
                        <DropdownMenu
                        defaultSelected={selectedCategory}
                        options={categories}
                        onSelectOption={handleCategoriesSelect}
                        />
                        <DropdownMenu
                        defaultSelected={selectedLector}
                        options={lectors}
                        onSelectOption={handleLectorsSelect}
                        />
                        <input 
                        type="time" 
                        placeholder="Выберите время"
                        className="modal--form__input"
                        onChange={(e) => setSelectedTime(e.target.value)}
                        />                        
                        <DropdownMenu
                        defaultSelected={selectedPlatform}
                        options={platforms}
                        onSelectOption={handlePlatformsSelect}
                        />
                        <input 
                        type="text" 
                        placeholder="Введите ссылку"
                        className="modal--form__input"
                        onChange={(e) => setLectureConfLink(e.target.value)}
                        />
                    </div>
                    <button 
                    type="button"
                    className="modal--button"
                    onClick={addNewLectureHandler}
                    >Добавить</button>
                </div>
            </Modal>
        )}
        {isEditEventModalOpen && (
            <Modal onClose={() => setIsEditEventModalOpen(false)}>
                <div className="modal--container">
                    <h3 className="modal--container__title">Редактирвоать данные</h3>
                    <div className="modal--form">
                        <input 
                        type="text" 
                        placeholder="Тема лекции"
                        className="modal--form__input"
                        onChange={(e) => setLectureName(e.target.value)}
                        />
                        <DropdownMenu
                        defaultSelected={selectedCategory}
                        options={categories}
                        onSelectOption={handleCategoriesSelect}
                        />
                        <input 
                        type="time" 
                        placeholder="Введите время"
                        className="modal--form__input"
                        onChange={(e) => setSelectedTime(e.target.value)}
                        />
                        <DropdownMenu
                        defaultSelected={selectedPlatform}
                        options={platforms}
                        onSelectOption={handlePlatformsSelect}
                        />
                        <input 
                        type="text" 
                        placeholder="Введите ссылку"
                        className="modal--form__input"
                        onChange={(e) => setLectureConfLink(e.target.value)}
                        />
                    </div>
                    <button 
                    type="button"
                    className="modal--button"
                    onClick={updateHandler}
                    >Сохранить изменения</button>
                </div>
            </Modal>
        )}
        {isDeleteModalOpen && (
            <Modal onClose={() => setIsDeleteModalOpen(false)}>
                <div className="modal--container">
                    <h3 className="modal--container__title">Вы уверены, что хотите удалить это мероприятие?</h3>
                    <div className="modal--exit-buttons">
                        <button
                        type="button"
                        className="modal--exit-buttons__no"
                        style={{
                            backgroundColor: "#7CF981"
                        }}
                        >
                            Нет
                        </button>
                        <button
                        type="button"
                        className="modal--exit-buttons__yes"
                        style={{
                            backgroundColor: "#FF6A6A"
                        }}
                        >
                            Да
                        </button>
                    </div>
                </div>
            </Modal>
        )}
    </>)
}