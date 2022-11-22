import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom"
import Home from "../../views/Home"
import Login from "../../views/Login"
import { tabToUrl } from "../../lib/helpers/helpers"
import RequireAuth from '../RequireAuth'
import Layout from './Layout'
import { selectCurrentAuthState } from "../../lib/store/auth/auth-slice"
import { useSelector } from 'react-redux'
import Sessions from '../../views/Sessions'

export default function Navigation() {
    const isAuth = useSelector(selectCurrentAuthState)
    const publicTabs = ['Home', 'Login']
    const protectedTabs = ['Home', 'Sessions', 'Account']
    const tabs = isAuth ? protectedTabs : publicTabs
    const paths = tabs.map(tab => tabToUrl(tab))

    return (
        <>
            <div className="nav bg-danger opacity-100">
                <div className="navbar p-2">
                    <div className="navbar-brand text-white fw-bold">
                        <Link className='nav-link text-white' to='/'>SQUACKER</Link>
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
                <Route path='/' element={<Layout />}>
                    {/* public routes */}
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Login />} />

                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route path='sessions' element={<Sessions />} />
                    </Route>

                </Route>
            </Routes>
        </>)
}
