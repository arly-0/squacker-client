import Login from "./login";
import Register from "./register";

export default function Auth() {
    const path = window.location.pathname
    return (
        <div className='container-fluid mt-5 d-flex justify-content-center align-items-center'>
            {path === '/login' ? <Login/> : <Register/>}
        </div>
    )
}