import { Outlet } from "react-router-dom"

import Navbar from "../components/navbar"

export default function AppLayout() {
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