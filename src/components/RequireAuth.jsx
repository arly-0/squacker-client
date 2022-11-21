import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { selectCurrentToken } from "../lib/store/auth/auth-slice"

export default function RequireAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return  token ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>
}
