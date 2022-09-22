import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom"
import Results from "../views/Results"
import Home from "../views/Home"
import Login from "../views/Login"
import {tabToUrl} from "../lib/helpers/helpers";

export default function NavBar() {
    const tabs = ['Home', 'Results', 'Login']
    const paths = tabs.map(tab => tabToUrl(tab))
    const components = [<Home/>, <Results/>, <Login/>]

    return (
        <BrowserRouter>
            <div className="nav bg-danger opacity-100">
                <div className="navbar p-2">
                    <div className="navbar-brand text-white fw-bold">
                        TRACKER
                    </div>
                    <div className="d-flex flex-row">
                        {tabs.map((tab, index) => (
                            <div key={tab} className="nav-item">
                                <Link className="nav-link text-white" to={paths[index]}>{tab}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Routes>
                {paths.map((path, index) => (
                    <Route key={path} path={path} element={components[index]}/>
                ))}
            </Routes>
        </BrowserRouter>
    )
}
