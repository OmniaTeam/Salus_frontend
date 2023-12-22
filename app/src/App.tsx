import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import './global.scss'
import './styles/index.scss'
import './styles/navbar.scss'
import './styles/eventCard.scss'
import './styles/modal.scss'
import './styles/dropdownMenu.scss'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

import IndexPage from "./pages/indexPage.tsx";
import MeditationsPage from "./pages/meditationsPage.tsx";
import AuthPage from "./pages/authPage.tsx";
import AppLayout from "./layouts/appLayout.tsx";
import SettingsPage from "./pages/settingsPage.tsx";
import StatisticsPage from "./pages/statisticsPage.tsx";
import LecturesPage from "./pages/lecturesPage.tsx";
import LectorsPage from "./pages/lectorsPage.tsx";
import LectorPage from "./pages/lectorPage.tsx";
import ProfilePage from "./pages/profilePage.tsx";

const store = setupStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const App = () => {
    useEffect(() => {
        switch (window.location.href) {
            case "http://localhost:5173/": {
                window.location.href = 'http://localhost:5173/application'
                return
            }
            case "https://salus.the-omnia.ru/": {
                window.location.href = "https://salus.the-omnia.ru/application"
                return
            }
        }
    }, [])

    return <>
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/application" element={<AppLayout/>}>
                            <Route path="" index={true} element={<IndexPage/>}/>
                            <Route path="profile" element={<ProfilePage/>}/>
                            <Route path="lectures" element={<LecturesPage/>}/>
                            <Route path="lectors" element={<LectorsPage/>}/>
                            <Route path="lector/:id" element={<LectorPage/>}/>
                            <Route path="meditations" element={<MeditationsPage/>}/>
                            <Route path="settings" element={<SettingsPage/>}/>
                            <Route path="statistics" element={<StatisticsPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </>
};

root.render(<App/>);